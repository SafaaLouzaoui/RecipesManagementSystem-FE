import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { Ingredient } from '../models/ingredient';
@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  url1 = 'http://localhost:8083/api/v1/ingredients/lireTous';
  url2 = 'http://localhost:8083/api/v1/ingredients/creer';
  url3 = 'http://localhost:8083/api/v1/ingredients/lire';
  url4 = 'http://localhost:8083/api/v1/ingredients/modifier';
  url5 = 'http://localhost:8083/api/v1/ingredients/supprimer';

  private token = localStorage.getItem('access_token');
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );

  constructor(private http: HttpClient) {}
  public getIngredients(): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.url1);
  }
  public createIngredient(Ingredient: Ingredient): Observable<Object> {
    return this.http.post<Ingredient>(this.url2, Ingredient, { headers: this.headers });
  }
  public getIngredientById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.url3}/${id}`);
  }
  public updateIngredient(
    id: number,
    ingredient: Ingredient
  ): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.url4}/${id}`, ingredient, { headers: this.headers });
  }
  deleteIngredient(id: number): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.url5}/${id}`, { headers: this.headers });
  }
}
