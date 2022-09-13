import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  token: any;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem("UserName");
    this.token = sessionStorage.getItem("auth-user");
    console.log(this.token);
  }
}