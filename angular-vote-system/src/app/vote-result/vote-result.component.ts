import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { VoteItem } from '../vote-item';
import { User } from '../user';

@Component({
  selector: 'app-vote-result',
  templateUrl: './vote-result.component.html',
  styleUrls: ['./vote-result.component.css']
})
export class VoteResultComponent implements OnInit {

  dates: VoteItem[] = [];
  places: VoteItem[] = [];
  users: User[] = [];
  displaySummary: boolean = true; 
  displayView: string = "DisplayAllVotes"; 
  totalDatesVotedNumber: number = 0;
  totalPlacesVotedNumber: number = 0;


  refresh(){
    this.getDates();
    this.getPlaces();
    this.getUsers();    
  }

  changeView(){
    if(this.displaySummary===true){
      this.displayView = "DisplaySummary";      
    }
    else {
      this.displayView = "DisplayAllVotes";
    }
    this.displaySummary = !this.displaySummary;
  }

  getPercentString(number1:number,number2:number):string{
    if(number2 > 0)
      return (Math.round(number1/number2*100)+"%");
    else
      return "0%"
  }

  getDates(){
    this.voteService.getvoteItems("dates").subscribe(dates =>{
      this.dates = dates;
      this.totalDatesVotedNumber = 0;
      dates.forEach(date => this.totalDatesVotedNumber = this.totalDatesVotedNumber + date.votedNumber);      
    });
  }

  getPlaces(){
    this.voteService.getvoteItems("places").subscribe(places =>{
      this.places = places;
      this.totalPlacesVotedNumber = 0;
      places.forEach(place => this.totalPlacesVotedNumber = this.totalPlacesVotedNumber + place.votedNumber);
    });
  }

  getUsers(){
    this.voteService.getUsers().subscribe(users => this.users = users);
  }

  goVote(){
    this.voteService.router.navigate(['/vote']);
  }

  logout(){
    this.voteService.logout();
  }

  constructor(private voteService: VoteService) { }

  ngOnInit() {
    this.getDates();
    this.getPlaces();
    this.getUsers();
  }

}
