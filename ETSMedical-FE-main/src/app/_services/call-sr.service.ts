
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserHub, SignalInfo, ChatMessage } from 'src/models/peerData.interface';

import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CallSrService {

  private hubConnection: signalR.HubConnection;

  private currentPeer = new Subject<UserHub>();
  public currentPeer$ = this.currentPeer.asObservable();

  private users: BehaviorSubject<Array<UserHub>>;
  public users$: Observable<Array<UserHub>>;

  private messages: BehaviorSubject<Array<ChatMessage>>;
  public messages$: Observable<Array<ChatMessage>>;

  private helloAnswer = new Subject<UserHub>();
  public helloAnswer$ = this.helloAnswer.asObservable();

  private disconnectedPeer = new Subject<UserHub>();
  public disconnectedPeer$ = this.disconnectedPeer.asObservable();

  private signal = new Subject<SignalInfo>();
  public signal$ = this.signal.asObservable();

  public caller = new Subject<UserHub>();
  public caller$ = this.caller.asObservable();

  public answer = new Subject<UserHub>();
  public answer$ = this.answer.asObservable();

  constructor(private token: TokenStorageService) {
    this.messages = new BehaviorSubject([]);
    this.messages$ = this.messages.asObservable();

    this.users = new BehaviorSubject([]);
    this.users$ = this.users.asObservable();

    const options: signalR.IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return  this.token.getToken();
      }
    };  
  }

  public async StartConnection(): Promise<void>{

    if(this.hubConnection != null){
      return
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://127.0.0.1:5000/AuthJWT/Hub/callhub' + '?token=' + this.token.getToken())
      .build();

    await this.hubConnection.start();
    console.log('Connection started');

    this.hubConnection.on('NewUserArrived', (data) => {
      this.users.next([...this.users.getValue(), JSON.parse(data)]);
    });

    this.hubConnection.on('NewMessage', (data) => {
      this.messages.next([...this.messages.getValue(), JSON.parse(data)]);
    });

    this.hubConnection.on('UserDisconnect', (data) => {
      this.disconnectedPeer.next(data);
    });

    this.hubConnection.on('UpdateUserList', (data) => {
      console.log(data);
      this.users.next([...JSON.parse(data)]);
    });

    this.hubConnection.on('SendSignal', (user, signal) => {
      console.log("Signal received");
      this.signal.next({ user, signal });
    });

    this.hubConnection.on('UserIsCalling', (user) => {
      this.caller.next(user); 
    })
    this.hubConnection.on('CallAccepted', (user) => {
      this.answer.next(user); 
    })

    this.hubConnection.on('DisconnectedUser', (user) => {
      var newUsers = this.users.getValue();

      newUsers = newUsers.filter(function(item) {
        return item.userName == user.userName
      })

      this.users.next([...newUsers]); 
    })

    this.hubConnection.invoke('Login');
  }

  public sendSignalToUser(signal: string, user: string) {
    this.hubConnection.invoke('SendSignal', signal, user);
  }

  public sayHello(userName: string, user: string): void {
    this.hubConnection.invoke('HelloUser', userName, user);
  }  
  
  public requestCall(callUser: UserHub): void{
    this.hubConnection.invoke('CallRequest', callUser);
  }

  public callAccepted(callingUser: UserHub): void {
    this.hubConnection.invoke('callAccepted', callingUser)
  }

  public sendMessage(message : string): void {
    this.hubConnection.invoke("SendMessage", message);
  }

}