import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  url1 = 'http://localhost:8083/api/v1/categories/lireTous';
  url2 = 'http://localhost:8083/api/v1/categories/creer';
  url3 = 'http://localhost:8083/api/v1/categories/supprimer';
  url4 = 'http://localhost:8083/api/v1/categories/modifier';
  url5 = 'http://localhost:8083/api/v1/categories/lire';

  constructor(private http: HttpClient) {}
  public getCategories(): Observable<Categorie> {
    return this.http.get(this.url1);
  }
  public createCategorie(Categorie: Categorie): Observable<Object> {
    return this.http.post(this.url2, Categorie);
  }
  deleteCategorie(id: number): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.url3}/${id}`);
  }
  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.url4}/${id}`, categorie);
  }
  getCategoryById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.url5}/${id}`);
  }
}
