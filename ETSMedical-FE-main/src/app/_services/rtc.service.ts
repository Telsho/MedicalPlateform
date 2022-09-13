import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Instance } from 'simple-peer';
import { PeerData, UserHub } from 'src/models/peerData.interface';

declare var SimplePeer: any;

@Injectable({
  providedIn: 'root'
})
export class RtcService {

  private users: BehaviorSubject<Array<UserHub>>;
  public users$: Observable<Array<UserHub>>;

  private onSignalToSend = new Subject<PeerData>();
  public onSignalToSend$ = this.onSignalToSend.asObservable();

  private onStream = new Subject<PeerData>();
  public onStream$ = this.onStream.asObservable();

  private onConnect = new Subject<PeerData>();
  public onConnect$ = this.onConnect.asObservable();

  private onData = new Subject<PeerData>();
  public onData$ = this.onData.asObservable();

  public currentPeer: Instance;

  constructor() {
    this.users = new BehaviorSubject([]);
    this.users$ = this.users.asObservable();
  }

  public newUser(user: UserHub): void {
    this.users.next([...this.users.getValue(), user]);
  }

  public disconnectedUser(user: UserHub): void {
    const filteredUsers = this.users.getValue().filter(x => x.connectionId === user.connectionId);
    this.users.next(filteredUsers);
  }

  public async createPeer(userId: string, stream:any, initiator: boolean): Promise<void> {
    console.log("getting here")
    // this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // console.log(this.stream);
    const peer = new SimplePeer({ initiator, stream });

    peer.on('signal', data => {
      if (data. renegotiate || data.transceiverRequest) return
      const stringData = JSON.stringify(data);
      this.onSignalToSend.next({ id: userId, data: stringData });
    });

    peer.on('stream', data => {
      console.log('on stream', data);
      this.onStream.next({ id: userId, data });
    });

    peer.on('connect', () => {
      console.log("Connecting..")
      this.onConnect.next({ id: userId, data: null });
    });

    peer.on('data', data => {
      this.onData.next({ id: userId, data });
    });

    this.currentPeer = peer;

    console.log("Peer created ! ");
    console.log(this.currentPeer);
  }

  public async signalPeer(userId: string, stream: any, signal: string) {
    const signalObject = signal;
    console.log("SIGNALPEER");
    if (this.currentPeer) {
      this.currentPeer.signal(signalObject);
    } else {
      await this.createPeer(userId, stream,false);
      this.currentPeer.signal(signalObject);
    }
  }

  public sendMessage(message: string) {
    this.currentPeer.send(message);
  }

}