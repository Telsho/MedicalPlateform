import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureComponent } from './temperature/temperature.component';
import { HeartbeatComponent } from './heartbeat/heartbeat.component';
import { ChartsModule } from 'ng2-charts';
import { CallRoomComponent } from './call-room.component';



@NgModule({
  declarations: [
    TemperatureComponent,
    HeartbeatComponent,
    CallRoomComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  bootstrap:[CallRoomComponent]
})

export class CallRoomModule { }
