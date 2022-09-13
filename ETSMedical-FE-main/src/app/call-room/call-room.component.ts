import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeerData, SignalInfo, UserHub } from 'src/models/peerData.interface';
import { CallSrService } from '../_services/call-sr.service';
import { PatientDataSrService } from '../_services/patient-data-sr.service';
import { RtcService } from '../_services/rtc.service';

@Component({
  selector: 'app-call-room',
  templateUrl: './call-room.component.html',
  styleUrls: ['./call-room.component.css']
})
export class CallRoomComponent implements OnInit {

  
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  
  public mediaError = (): void => { console.error(`Can't get user media`); };

  public subscriptions = new Subscription();
  
  private stream: MediaStream;

  public userVideo: string;
  public callUser: UserHub = {connectionId: "", userName :"", role:""};
  
  constructor(private rtcService: RtcService, 
    private callSrService: CallSrService, 
    public patientDataService: PatientDataSrService, 
    private router : Router) {
      var routeValue = this.router.getCurrentNavigation().extras.state;
      this.callUser.userName = routeValue["userName"];
      this.callUser.role = routeValue["role"];
      this.callUser.connectionId = routeValue["connectionId"];
     }

  async ngOnInit(): Promise<void> {

    this.patientDataService.startConnection(this.callUser.role);
    this.subscriptions.add(this.callSrService.disconnectedPeer$.subscribe((user: UserHub) => {
      this.rtcService.disconnectedUser(user);
    }));

    this.subscriptions.add(this.callSrService.signal$.subscribe((signalData: SignalInfo) => {
      this.rtcService.signalPeer(signalData.user, this.stream, signalData.signal);
    }));

    this.subscriptions.add(this.rtcService.onSignalToSend$.subscribe((data: PeerData) => {
      this.callSrService.sendSignalToUser(data.data, data.id);
    }));

    this.subscriptions.add(this.rtcService.onStream$.subscribe((data: PeerData) => {
      this.userVideo = data.id;
      this.videoPlayer.nativeElement.srcObject = data.data;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }));

    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.rtcService.createPeer(this.callUser.connectionId, this.stream, true);
  }

}
