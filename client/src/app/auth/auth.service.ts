import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/users';

  constructor(private http:HttpClient, private router:Router) { }

   registerUser(body:any){
    return this.http.post(this.baseUrl+'/register',body,{observe:'body'});
  }

  loginUser(body:any){
    return this.http.post(this.baseUrl+'/login',body,{observe:'body'});
  }
  getUserName(){
    return this.http.get(this.baseUrl+'/username',{
      observe: 'body',
      params: new HttpParams().append('token',localStorage.getItem('token'))
    });
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  
}
