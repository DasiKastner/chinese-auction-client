import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gift } from '../models/gift.model';
import { Purchase } from '../models/Purchase';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:7096/api/Purchase"

  getCart(userId: number): Observable<Purchase[]>{
    debugger
    const token = sessionStorage.getItem('token'); 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    return this.http.get<Purchase[]>(this.BASE_URL + '/' + userId,{ headers })
  }

  addToCart(userId: number, giftId: number): Observable<Purchase>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  console.log(headers);
    return this.http.post<Purchase>(this.BASE_URL + '/' + userId, giftId,{headers});
  }

  deleteFromCart(userId: number, giftId: number): Observable<Purchase>{
    const token = sessionStorage.getItem('token'); 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    return this.http.delete<Purchase>(this.BASE_URL + '/' + userId + '/' + giftId,{ headers })
  }
  buyCart(userId: number,giftId: number): Observable<Purchase>{
    const token = sessionStorage.getItem('token'); 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Purchase>(this.BASE_URL + '/' + userId, giftId,{ headers })
  }
   PurchasersDetails(id: number): Observable<User[]>{
      debugger
      const token = sessionStorage.getItem('token'); // קבלת האסימון מה-localStorage
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      console.log(headers);
      var e = this.http.get<User[]>(this.BASE_URL + '/a/' + id,{ headers })
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
