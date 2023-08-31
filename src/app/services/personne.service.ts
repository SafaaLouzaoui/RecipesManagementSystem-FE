import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personne } from '../models/personne';
import { Recette } from '../models/recette';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  url1 = 'http://localhost:8083/api/v1/utilisateurs/lireTous';
  url2 = 'http://localhost:8083/api/v1/utilisateurs/bloquer/';
  url3 = 'http://localhost:8083/api/v1/utilisateurs/lire/';
  url4 = 'http://localhost:8083/api/v1/utilisateurs/modifier/';
  url5 = 'http://localhost:8083/api/v1/utilisateurs/activer/';
  url6 = 'http://localhost:8083/api/v1/utilisateurs/promote/';
  url7 = 'http://localhost:8083/api/v1/utilisateurs/mesFollowers';

  private token = localStorage.getItem('access_token');
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );


  constructor(private http: HttpClient) {}
  userpos?: any;
  userId?: any;
  setUserPos(message?: string) {
    this.userpos = message;
  }
  getuserPos() {
    return this.userpos;
  }

  setUserId(id: any) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
  }

  public showOnePerson(id?: number): Observable<Personne> {
    return this.http.get<Personne>(this.url3 + id);
  }

  public updateUser(id?: number, personne?: Personne): Observable<Object> {
    return this.http.put(this.url4 + id, personne, { headers: this.headers });
  }

  public getAllPersons(): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.url1, { headers: this.headers });
  }

  public bloque_compte(
    id?: number,
    personne1?: Personne
  ): Observable<Personne> {
    return this.http.post<Personne>(this.url2 + id, personne1, { headers: this.headers });
  }

  public activer_compte(
    id?: number,
    personne1?: Personne
  ): Observable<Personne> {
    return this.http.post<Personne>(this.url5 + id, personne1, { headers: this.headers });
  }
  public promoteUserVersModerator(
    id?: number,
    personne1?: Personne
  ): Observable<Personne> {
    return this.http.post<Personne>(this.url6 + id, personne1, { headers: this.headers });
  }


  // public LoginUser(personne?: Personne): Observable<Object> {
  //   return this.http.post(this.url7, personne);
  // }
  public abonner(
    id: number,
    idd: number,
    recette: Recette
  ): Observable<Object> {
    const url =
      'http://localhost:8083/api/v1/utilisateurs/abonner/' + id + '/' + idd;
    return this.http.post(url, recette, { headers: this.headers });
  }

  public mesFollowers(id: number): Observable<Personne[]> {
    // Append the id parameter to the URL
    const urlWithId = `${this.url7}/${id}`;
    return this.http.get<Personne[]>(urlWithId, { headers: this.headers });
  }
}
