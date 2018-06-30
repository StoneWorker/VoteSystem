import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot }    from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { VoteItem } from './vote-item';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class VoteService implements CanActivate{

  isLoggedIn: boolean = false;
  redirectUrl: string ="vote";
  user: User;  
  userIndex: number;

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log('VoteService.canActivate method called');
    if(this.isLoggedIn) {return true}
    this.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

  checkLogin(userName: string, password: string): boolean{
    this.getUsersByName(userName).subscribe(users =>{    
        console.log("name included: " + users.length);        
        this.userIndex = users.findIndex(user =>(user.name === userName && user.password === password));
        if(this.userIndex>-1){  
          console.log('success login');        
          this.user = users[this.userIndex];
          this.isLoggedIn = true;          
          this.router.navigate([this.redirectUrl]);
          console.log(this.user);
          return true;
        }
        else {
          alert("user name or password is not right!");          
        }         
    });    
    return false; 
  }

  getUsers():Observable<User[]>{
    const url=`api/users`;
    return this.http.get<User[]>(url);
  }

  getUsersByName(name: string):Observable<User[]>{
    const url=`api/users/?name=${name}`;
    return this.http.get<User[]>(url);
  }

  updateUser(user: User): Observable<any>{
    return this.http.put('api/users', user, httpOptions); 
  }

  getvoteItems(name: string):Observable<VoteItem[]>{
    const  url=`api/${name}`;
    return this.http.get<VoteItem[]>(url);
  }

  getvoteItem(name: string, id: number):Observable<VoteItem>{
    const  url=`api/${name}/${id}`;
    return this.http.get<VoteItem>(url);
  }

  addvoteItem(name: string, voteItem: VoteItem):Observable<VoteItem>{
    const  url=`api/${name}`;
    return this.http.post<VoteItem>(url, voteItem, httpOptions);
  }

  updatevoteItem(name: string, voteItem: VoteItem):Observable<VoteItem>{
    const  url=`api/${name}`;
    return this.http.put<VoteItem>(url, voteItem, httpOptions);
  }




  logout(){
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/login']);
  }

  constructor(public router: Router, private http: HttpClient) { }

}
