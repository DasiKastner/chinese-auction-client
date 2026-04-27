import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donor } from '../models/Donor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gift } from '../models/gift.model';


@Injectable({
  providedIn: 'root'
})
export class DonorService {

giftss!: Observable<Gift[]> 

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:7096/api/Donor"
  GIFT_URL = "https://localhost:7096/api/Gift"

  getDonors(): Observable<Donor[]>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Donor[]>(this.BASE_URL,{ headers })
  }

  createDonor(donor: Donor): Observable<Donor>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Donor>(this.BASE_URL, donor,{ headers })
  }

  updateDonor(donor: Donor): Observable<Donor>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    debugger
    return this.http.put<Donor>(this.BASE_URL, donor,{ headers })
  }

  deleteDonor(id: number): Observable<string>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(this.BASE_URL + '/' + id,{ headers })
  }

  GetGiftsPerDonor(id: number): Observable<Gift[]> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    var z = this.http.get<Gift[]>(this.BASE_URL + '/' + id,{ headers });
    return z
  }
}
