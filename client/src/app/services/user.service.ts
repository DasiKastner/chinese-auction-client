import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token1!:any
  public login1 = new Login();
  isUser: number = 0

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:7096/api/Auth"

  register(user: User): Observable<User>{
    return this.http.post<User>(this.BASE_URL,user);
  }


  login(user: Login): Observable<any>{
    return this.token1 = this.http.post<any>(`${this.BASE_URL}/login` , user);
  }
}
