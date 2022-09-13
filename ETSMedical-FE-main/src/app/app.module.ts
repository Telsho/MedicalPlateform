import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserListComponent } from './user-list/user-list.component';
import { CallHubComponent } from './callhub/callhub.component';
import { TemperatureComponent } from './call-room/temperature/temperature.component';
import { CallPopupComponent } from './callhub/call-popup/call-popup.component';
import { CallSrService } from './_services/call-sr.service';
import { CallRoomComponent } from './call-room/call-room.component';
import { HeartbeatComponent } from './call-room/heartbeat/heartbeat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CallRoomComponent,
    ProfileComponent,
    TemperatureComponent,
    UserListComponent,
    CallHubComponent,
    CallPopupComponent,
    HeartbeatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }