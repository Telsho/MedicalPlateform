import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RtcService } from '../_services/rtc.service';
import { Observable, Subscription } from 'rxjs';
import { CallSrService } from '../_services/call-sr.service';
import { UserHub, PeerData, SignalInfo, ChatMessage } from 'src/models/peerData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'callhub',
  templateUrl: './callhub.component.html',
  styleUrls: ['./callhub.component.css']
})
export class CallHubComponent implements OnInit, OnDestroy {


  public currentUser: string;

  public dataString: string;

  public userVideo: string;
  
  public messages$: Observable<Array<ChatMessage>>;

  public mediaError = (): void => { console.error(`Can't get user media`); };

  public subscriptions = new Subscription();

  constructor(private callSrService: CallSrService,private router : Router) { }

  ngOnInit() {
    this.callSrService.StartConnection();
    this.messages$ = this.callSrService.messages$;

    this.subscriptions.add(this.callSrService.answer$.subscribe((user: UserHub) => {
      this.router.navigate(['/callroom'], {state : user})
    })); 
  }

  public sendMessage() {
    this.callSrService.sendMessage(this.dataString);
    this.dataString = null;
  }

  ngOnDestroy() {
  }

}