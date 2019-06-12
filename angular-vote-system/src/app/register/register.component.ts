import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string;
  userPassword: string; 

  register() {    
    console.log("RegisterComponent called!   "+ "username: "+this.userName+    "  password: "+this.userPassword); 
    this.voteService.register([this.userName,Md5.hashStr(this.userPassword).toString()]).subscribe(result =>
      {
        if(result){
          alert("You have register Successfully! Please Login!");
          this.voteService.router.navigate(['/login']); 
        }
        else{
          alert("Register failed! Please try it again!");
        }
      }
    );    
  }

  constructor(public voteService: VoteService) { }

  ngOnInit() {
  }

}
