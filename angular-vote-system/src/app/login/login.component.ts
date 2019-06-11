import { Component, OnInit, Input } from '@angular/core';
import { VoteService } from '../vote.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userName: string;
  userPassword: string; 


  login() {    
    console.log("LoginComponent.login method called!   "+ "username: "+this.userName+    "  password: "+this.userPassword); 
    this.voteService.checkLogin(this.userName,this.userPassword);    
  }

  logout(){
    this.voteService.logout();
  }

  constructor(public voteService: VoteService) { }

  ngOnInit() {
  }

}
