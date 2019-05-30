import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot }    from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { VoteItem } from './vote-item';
import { Observable } from 'rxjs';
import { Md5} from "ts-md5/dist/md5";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class VoteService implements CanActivate{

  //isLoggedIn: boolean = false;
  isLoggedIn : boolean = sessionStorage['isLoggedIn']!=null?JSON.parse(sessionStorage['isLoggedIn']):false;
  redirectUrl: string ="vote";
  //user: User; 
  user: User = sessionStorage['user']!=null?JSON.parse(sessionStorage['user']):null;
  userIndex: number;
  //Base server path
  baseServerPath: string ="http://192.168.100.101:80/";

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
        console.log(Md5.hashStr(password));    
        this.userIndex = users.findIndex(user =>(user.name === userName && user.password === Md5.hashStr(password)));
        if(this.userIndex>-1){  
          console.log('success login');        
          this.user = users[this.userIndex];
          this.isLoggedIn = true; 
          this.updateSessionStorage(this.user,this.isLoggedIn);
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

  updateSessionStorage(user:User,isLoggedIn?:boolean){
    sessionStorage.setItem('user', JSON.stringify(user));
    if(isLoggedIn!=null)
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  getUsers():Observable<User[]>{
    const url=`${this.baseServerPath}api/users`;
    return this.http.get<User[]>(url);
  }

  getUsersByName(name: string):Observable<User[]>{
    const url=`${this.baseServerPath}api/users/?name=${name}`;
    return this.http.get<User[]>(url);
  }

  updateUser(user: User): Observable<any>{
    return this.http.put(`${this.baseServerPath}api/users`, user, httpOptions); 
  }

  getvoteItems(name: string):Observable<VoteItem[]>{

    const  url=`${this.baseServerPath}api/${name}`;
    return this.http.get<VoteItem[]>(url);
  }

  getvoteItem(name: string, id: number):Observable<VoteItem>{
    const  url=`${this.baseServerPath}api/${name}/${id}`;
    return this.http.get<VoteItem>(url);
  }

  addvoteItem(name: string, voteItem: VoteItem):Observable<VoteItem>{
    const  url=`${this.baseServerPath}api/${name}`;
    return this.http.post<VoteItem>(url, voteItem, httpOptions);
  }

  updatevoteItem(name: string, voteItem: VoteItem):Observable<any>{
    const  url=`${this.baseServerPath}api/${name}`;
    return this.http.put<VoteItem>(url, voteItem, httpOptions);
  }




  logout(){
    this.isLoggedIn = false;
    this.user = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn'); 
    this.router.navigate(['/login']);
  }

  constructor(public router: Router, private http: HttpClient) { }

}
