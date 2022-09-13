import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallHubComponent } from './callhub/callhub.component';
import { TemperatureComponent } from './call-room/temperature/temperature.component';
import { UserListComponent } from './user-list/user-list.component';
import { CallRoomComponent } from './call-room/call-room.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'callhub', component: CallHubComponent },
  { path: 'callroom', component: CallRoomComponent },
  { path: 'profile', component: ProfileComponent },
  
  { path: 'list', component: UserListComponent },
  { path: 'temperature', component: TemperatureComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }