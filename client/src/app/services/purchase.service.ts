import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:7096/api/PurchasingManagement"



  PurchasersDetails(id: number): Observable<User[]>{
    debugger
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    var e = this.http.get<User[]>(this.BASE_URL + '/' + id,{ headers })
    return e
  }

  getAllDetails(): Observable<User[]>{
    debugger
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    return this.http.get<User[]>(this.BASE_URL + '/getDetails', { headers })
  }

}
