import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift } from '../models/gift.model';
                                                                  
@Injectable({
  providedIn: 'root'
})
export class GiftServiceService {
  
  BASE_URL = "https://localhost:7096/api/Gift"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Gift[]>{
    return this.http.get<Gift[]>(this.BASE_URL);
  }

  updateGift(gift: Gift): Observable<Gift>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log("sdgffffff"+gift.id);
    
    return this.http.put<Gift>(this.BASE_URL, gift,{ headers });
  }

  creategift(gift: Gift): Observable<Gift>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Gift>(this.BASE_URL, gift,{ headers });
  }

  deleteGift(id: number): Observable<string>
  {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(this.BASE_URL + '/' + id,{ headers }); 
  }
}

