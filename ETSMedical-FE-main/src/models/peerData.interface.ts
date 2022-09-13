import { Timestamp } from "rxjs";

export interface PeerData {
    id: string;
    data: any;
  }
  
  export interface UserHub {
    userName: string;
    role: string;
    connectionId: string;
  }
  
  export interface SignalInfo {
    user: string;
    signal: any;
  }
  
  export interface ChatMessage {
    user: UserHub;
    message: string;
    timestamp: string;
  }