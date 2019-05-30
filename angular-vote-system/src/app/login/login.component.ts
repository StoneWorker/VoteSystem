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
  
  user = new User; 

  login() {    
    console.log("LoginComponent.login method called!   "+ "username: "+this.user.name+    "  password: "+this.user.password); 
    this.voteService.checkLogin(this.user.name,this.user.password);    
  }

  logout(){
    this.voteService.logout();
  }

  constructor(public voteService: VoteService) { }

  ngOnInit() {
  }

}
