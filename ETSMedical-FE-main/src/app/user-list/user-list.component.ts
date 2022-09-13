import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, VirtualTimeScheduler } from 'rxjs';
import { RtcService } from '../_services/rtc.service';
import { UserHub } from 'src/models/peerData.interface';
import { CallSrService } from '../_services/call-sr.service';
import { UserInfo } from 'node:os';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  public users$: Observable<Array<UserHub>>;
  public selectedUser: UserHub;


  constructor(private callSrService : CallSrService) { }

  ngOnInit() {
    this.users$ = this.callSrService.users$;
    console.log(this.users$);
  }

  public async userClicked(user: UserHub) {
    this.selectedUser = user;
    await this.callSrService.requestCall(user);
    
    setTimeout(() => {  this.selectedUser = null }, 10000);
  }


}