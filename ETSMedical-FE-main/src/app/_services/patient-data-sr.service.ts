import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { TokenStorageService } from './token-storage.service';

const PATIENTDATA_HUB = 'https://127.0.0.1:5000/AuthJWT/Hub/PatientDataHub';

@Injectable({
  providedIn: 'root'
})

export class PatientDataSrService {

  public temperature: any = [{ data: [], label: 'Temperature' }]
  public temperatureLabels: any = []

  public heartbeat: any = [{ data: [], label: 'Heartbeat' }]
  public HeartbeatLabels: any = []

  private hubConnection: signalR.HubConnection

  public async startConnection(role: string) : Promise<void> {

    if(role != "Doctor" && this.hubConnection != null){
      return;
    }
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(PATIENTDATA_HUB + '?token=' + this.token.getToken())
      .build();

    await this.hubConnection.start();
    console.log("Patient data connection started !")


    this.hubConnection.on('transferTemperature', (data) => {
      this.temperature[0].data.push(data);

      let date = new Date()
      this.temperatureLabels.push(date.toLocaleTimeString())
      console.log(data);
    });

    this.hubConnection.on('transferHeartbeat', (data) => {
      this.heartbeat[0].data.push(data);

      let date = new Date()
      this.HeartbeatLabels.push(date.toLocaleTimeString())
      console.log(data);
    });

    this.hubConnection.invoke("Login");
  }

  constructor(private token: TokenStorageService) { }
}
