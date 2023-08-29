import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private url1 = 'http://localhost:8083/api/v1/categories/lireTous';
  private url2 = 'http://localhost:8083/api/v1/categories/creer';
  private url3 = 'http://localhost:8083/api/v1/categories/supprimer';
  private url4 = 'http://localhost:8083/api/v1/categories/modifier';
  private url5 = 'http://localhost:8083/api/v1/categories/lire';

  private token = localStorage.getItem('access_token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url1);
  }

  createCategorie(categorie: Categorie): Observable<any> {
    return this.http.post(this.url2, categorie, { headers: this.headers });
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.url3}/${id}`, { headers: this.headers });
  }

  updateCategorie(id: number, categorie: Categorie): Observable<any> {
    return this.http.put(`${this.url4}/${id}`, categorie, { headers: this.headers });
  }

  getCategoryById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.url5}/${id}`);
  }
}
