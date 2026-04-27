import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lottery } from '../models/Lottery';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:7096/api/Lottery"

  getWinners(): Observable<Lottery[]>{
     const token = sessionStorage.getItem('token');   
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
    return this.http.get<Lottery[]>(this.BASE_URL,{ headers })
  }
  raffle(giftId: number): Observable<User>{
    const token = sessionStorage.getItem('token'); 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<User>(this.BASE_URL,giftId,{ headers })
  }
  totalBenefit(): Observable<number>{
    const token = sessionStorage.getItem('token'); 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<number>(this.BASE_URL + '/totalPay',{ headers })
  }
}
