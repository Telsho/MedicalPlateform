import { Component, OnInit, Input, Output, OnChanges, EventEmitter, } from '@angular/core';
import {  trigger, state, style, animate, transition } from '@angular/animations';
import { CallSrService } from '../../_services/call-sr.service';
import { UserHub } from 'src/models/peerData.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-call-popup',
  templateUrl: './call-popup.component.html',
  styleUrls: ['./call-popup.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class CallPopupComponent implements OnInit {

  visible: boolean;
  text : string;
  callingUser: UserHub;
  audio : HTMLAudioElement;
  public subscriptions = new Subscription();
  
  
  constructor(private callSrService : CallSrService, private router : Router) { }

  ngOnInit(): void {
    this.subscriptions.add(this.callSrService.caller$.subscribe((data: UserHub) => {
      console.log("Call pop up");
      this.visible = true;
      this.callingUser = data;
      this.text = data.role + " " + data.userName + " is calling you";
      this.audio.currentTime = 0;
      this.audio.play();
    }));

    this.audio = new Audio();
    this.audio.src = "../../assets/Sounds/basic-ringtone.mp3";
    this.audio.loop = true;

  }

  Answer(): void {
    this.audio.pause();
    this.visible = false;
    this.router.navigate(['/callroom'], {state : this.callingUser})
    this.callSrService.callAccepted(this.callingUser);
  }

  Decline() : void{
    this.audio.pause();
    this.visible = false;
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/Sounds/basic-ringtone.mp3";
    audio.load();
    audio.loop = true;
    audio.play();
  }

  Show(user: UserHub): void{
    this.callingUser = user;
    this.text = user.role + " " + user.userName + " is calling";
    this.visible = true;
  }

}
