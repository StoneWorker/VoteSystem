import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot }    from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { VoteItem } from './vote-item';
import { Observable } from 'rxjs';
import { Md5} from "ts-md5/dist/md5";
import { NullAstVisitor } from '@angular/compiler';

/*
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
*/

@Injectable()
export class VoteService implements CanActivate{

  //isLoggedIn: boolean = false;
  isLoggedIn : boolean = sessionStorage['isLoggedIn']!=null?JSON.parse(sessionStorage['isLoggedIn']):false;
  redirectUrl: string ="vote";
  //user: User; 
  user: User = sessionStorage['user']!=null?JSON.parse(sessionStorage['user']):null;
  //userIndex: number;  
  //Base server path
  baseServerPath: string ="http://localhost:53604/";

  key: string = ':!123@321008'; 
  userName:string = this.user!=null?this.user.name:'notLogin';  
  token: string = Md5.hashStr( this.key+ this.userName).toString();    
  httpOptions = {
    headers :new HttpHeaders({'Content-Type': 'application/json'}).set('user',this.userName).set('token',this.token)  
  };

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log('VoteService.canActivate method called');
    if(this.isLoggedIn) {return true}
    this.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

/*
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
*/

  checkLogin(userName: string, password: string): boolean{
    console.log(Md5.hashStr(password));     
    this.getLoginResult([userName, Md5.hashStr(password).toString(),"checkUser"]).subscribe(user =>{                 
        if(user!==null){  
          console.log('success login');     
          this.isLoggedIn = true;     
          this.user = user;          
          this.updateSessionStorage(this.user,this.isLoggedIn);
          this.updateHeaders();
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

  updateHeaders(){
    if(this.user != null){
      this.userName = this.user.name;
    }
    else{
      this.userName = 'notLogin';
    }
    this.token = Md5.hashStr( this.key+ this.userName).toString(); 
    this.httpOptions = {
      headers :new HttpHeaders({'Content-Type': 'application/json'}).set('user',this.userName).set('token',this.token)  
      };
    console.log(this.httpOptions); 
    console.log(this.token); 
    console.log(this.userName);
  }

  updateSessionStorage(user:User,isLoggedIn?:boolean){
    sessionStorage.setItem('user', JSON.stringify(user));
    if(isLoggedIn!=null)
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }
  
  getLoginResult(user:string[]):Observable<any>{  
    const url=`${this.baseServerPath}api/users`;
    return this.http.post<any>(url, user, this.httpOptions);
  }

  register(user:string[]):Observable<boolean>{  
    const url=`${this.baseServerPath}api/users`;
    return this.http.post<boolean>(url, user, this.httpOptions);
  }

  getUsers():Observable<User[]>{
    const url=`${this.baseServerPath}api/users`;
    return this.http.get<User[]>(url,this.httpOptions);
  }

  getUsersByName(name: string):Observable<User[]>{
    const url=`${this.baseServerPath}api/users/?name=${name}`;
    return this.http.get<User[]>(url,this.httpOptions);
  }

  updateUser(user: User): Observable<any>{
    return this.http.put(`${this.baseServerPath}api/users`, user, this.httpOptions); 
  }

  getvoteItems(name: string):Observable<VoteItem[]>{
    const  url=`${this.baseServerPath}api/${name}`;
    return this.http.get<VoteItem[]>(url,this.httpOptions);
  }

  getvoteItem(name: string, id: number):Observable<VoteItem>{
    const  url=`${this.baseServerPath}api/${name}/${id}`;
    return this.http.get<VoteItem>(url,this.httpOptions);
  }

  addvoteItem(name: string, voteItem: VoteItem):Observable<VoteItem>{
    const  url=`${this.baseServerPath}api/${name}`;
    return this.http.post<VoteItem>(url, voteItem, this.httpOptions);
  }

  updatevoteItem(name: string, voteItem: VoteItem):Observable<any>{
    const  url=`${this.baseServerPath}api/${name}`;
    return this.http.put<VoteItem>(url, voteItem, this.httpOptions);
  }


  logout(){
    this.isLoggedIn = false;
    this.user = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn'); 
    this.updateHeaders();
    this.router.navigate(['/login']);
  }

  constructor(public router: Router, private http: HttpClient) { }

}
