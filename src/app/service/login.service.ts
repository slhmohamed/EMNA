import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './conf';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginSttateSubject =new Subject<boolean>();
  constructor(private http:HttpClient) { }

  //generate  token

  public generateToken(loginData:any)
  {  
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }


  //isLogn:user logeed in or not
  public isLoggedIn(){
    let token=localStorage.getItem('token')
    if(token==undefined||token==''||token==null){
      return false;
    }
    else{
      return true;
    }
  }
    //login user:set token in local storage
    public loginUser(tok: string){
      console.log(tok);
      
         localStorage.setItem('token',tok);
   //this.loginSttateSubject.next(true)
      
      return true;
    }
  //logout:remove token from local storage

  public logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    return true;
  }
  //current user:which is loggedin

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //get token

  public getToken(){
    return localStorage.getItem('token')
  }
  //setUserDeatil

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  public getUser(){
    let userStr=localStorage.getItem('user')
 
    if(userStr!=null){
      return JSON.parse(userStr)
    }else{
    this.logout();
    return null;
    }
  }

  //get User Role

  public getUserRole()
  {
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}