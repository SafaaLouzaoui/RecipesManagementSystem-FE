import { MotCle } from './../models/mot-cle';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MotCleService {
  url1 = 'http://localhost:8083/api/v1/motsCles/lireTous';
  url2 = 'http://localhost:8083/api/v1/motsCles/creer';

  private token = localStorage.getItem('access_token');
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );

  constructor(private http: HttpClient) {}

  public getMotCles(): Observable<MotCle> {
    return this.http.get<MotCle>(this.url1);
  }

  public createMotCle(motCle: MotCle):Observable<Object>{
    return this.http.post<MotCle>(this.url2, motCle, { headers: this.headers });
  }
}
