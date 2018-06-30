import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { VoteItem } from '../vote-item';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  dates: VoteItem[] = [];
  places: VoteItem[] = [];
  voteItemAdded: VoteItem;
  selectedDate: VoteItem = new VoteItem;
  selectedPlace: VoteItem = new VoteItem;

  getvoteItems(){
    this.voteService.getvoteItems("dates").subscribe(dates =>{this.dates = dates});
    this.voteService.getvoteItems("places").subscribe(places =>{this.places = places});
    
  }

  addDate(dateAdded:string){
    this.voteItemAdded = new VoteItem;
    this.voteItemAdded.name = dateAdded;
    this.voteItemAdded.votedNumber = 0;
    this.voteService.addvoteItem("dates", this.voteItemAdded).subscribe(voteItem => this.dates.push(voteItem));
  }

  addPlace(placeAdded:string){   
    this.voteItemAdded = new VoteItem;
    this.voteItemAdded.name = placeAdded;
    this.voteItemAdded.votedNumber = 0;
    this.voteService.addvoteItem("places", this.voteItemAdded).subscribe(voteItem => this.places.push(voteItem));
  }

  vote(){
    if(this.voteService.user.voted === false){
      this.voteService.user.voted = true;
      this.voteService.user.selectedDate = this.selectedDate.name;
      this.voteService.user.selectedPlace = this.selectedPlace.name;   
      this.voteService.updateUser(this.voteService.user).subscribe();
      this.dates.forEach(date =>{
        if(date.name === this.selectedDate.name){
          this.voteService.getvoteItem("dates",date.id).subscribe(dateDB =>{                     
            dateDB.votedNumber = dateDB.votedNumber + 1;          
            this.voteService.updatevoteItem("dates",dateDB).subscribe();         
          }) ;        
        }
      });
      this.places.forEach(place =>{
        if(place.name === this.selectedPlace.name){
          this.voteService.getvoteItem("places",place.id).subscribe(placeDB =>{                     
            placeDB.votedNumber = placeDB.votedNumber + 1;
            this.voteService.updatevoteItem("places",placeDB).subscribe(() => this.voteService.router.navigate(['/voteresult']));                     
          });        
        }
      });
    }
    else {
      alert("You have voted before! Please do not vote again!"); 
      this.voteService.router.navigate(['/voteresult']);     
    }
    
  }

  logout(){
    this.voteService.logout();
  }

  constructor(private voteService: VoteService ) {}

  ngOnInit() {
    this.getvoteItems();
  }

}
