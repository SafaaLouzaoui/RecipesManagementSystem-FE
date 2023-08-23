import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.put(this.url4 + id, personne);
  }

  public getAllPersons(): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.url1);
  }

  public bloque_compte(
    id?: number,
    personne1?: Personne
  ): Observable<Personne> {
    return this.http.post<Personne>(this.url2 + id, personne1);
  }

  public activer_compte(
    id?: number,
    personne1?: Personne
  ): Observable<Personne> {
    return this.http.post<Personne>(this.url5 + id, personne1);
  }
  public promoteUserVersModerator(
    id?: number,
    personne1?: Personne
  ): Observable<Personne> {
    return this.http.post<Personne>(this.url6 + id, personne1);
  }


  // public LoginUser(personne?: Personne): Observable<Object> {
  //   return this.http.post(this.url7, personne);
  // }
  public Abonner(
    id: number,
    idd: number,
    recette: Recette
  ): Observable<Object> {
    const url =
      'http://localhost:8083/api/v1/utilisateurs/abonner/' + id + '/' + idd;
    return this.http.post(url, recette);
  }
}
