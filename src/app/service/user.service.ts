import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import baseUrl from './conf';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
//add user
  public newUser(user:User){ 
    return this.http.post(`${baseUrl}/user/`,user)
  }

  
  public getBanques(){ 
    return this.http.get(`${baseUrl}/banque/getAllBanque`)
  }

   
   public getUsers(){ 
    return this.http.get(`${baseUrl}/user/getAllUser`)
  }

  public deleteUser(userId){ 
    return this.http.delete(`${baseUrl}/user/`+userId)
  }




}