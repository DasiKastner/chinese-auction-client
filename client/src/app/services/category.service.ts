import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:7096/api/Category"

  getCategories(): Observable<Category[]>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Category[]>(this.BASE_URL,{ headers })
  }
}
