import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

const data = [
  {
    name: "Admin",
    password: "admin",
    permission: "admin"
  },
  {
    name: "User",
    password: "user",
    permission: "user"
  }
];


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject({name: null, isAdmin: false, sessionId: null});

  constructor() { 
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    if(loggedInUser?.sessionId){
      this.user.next(this.getUserDetails(loggedInUser.name, loggedInUser.sessionId));
    }
  }

  loginUser(userName: string, pwd: string){
    const isValid = data.some(({name, password})=> name === userName && password === pwd);
    if(isValid){
      const sessionId = Math.random();
      sessionStorage.setItem('loggedUser', JSON.stringify({sessionId, name: userName}));
      this.user.next(this.getUserDetails(userName, sessionId));
    } else {
      sessionStorage.clear();
    }
    return of(isValid);
  }

  isUserValid(){
    let loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    console.log(loggedUser?.sessionId , this.user.value.sessionId);
    return loggedUser?.sessionId === this.user.value.sessionId || false;
  }

  logOut(){
    sessionStorage.clear();
    this.user.next({name: null, isAdmin: false, sessionId: null});
    return of(true);
  }

  getUserDetails(userName, sessionId){
    return {name: userName, 
      isAdmin: data.some(({name, permission})=> name === userName && permission === 'admin'), 
      sessionId};
    }
  
}
