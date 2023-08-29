import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette } from '../models/recette';
import { Quantite } from '../models/quantite';

@Injectable({
  providedIn: 'root',
})
export class RecetteService {
  private apiUrl1 = 'http://localhost:8083/api/v1/recettes/creer';
  private apiUrl2 = 'http://localhost:8083/api/v1/recettes/lireTous';
  private apiUrl3 = 'http://localhost:8083/api/v1/recettes/modifier';
  private apiUrl3_1 = 'http://localhost:8083/api/v1/recettes/mien/modifier';
  private apiUrl4 = 'http://localhost:8083/api/v1/recettes/lire';
  private apiUrl5 = 'http://localhost:8083/api/v1/recettes/supprimer';
  private apiUrl5_1 = 'http://localhost:8083/api/v1/recettes/mien/supprimer';
  private apiUrl6 = 'http://localhost:8083/api/v1/quantites/lireTous';
<<<<<<< HEAD
  private apiUrl7 = 'http://localhost:8083/api/v1/recettes/recettesByCategorie/';
  private apiUrl8 = 'http://localhost:8083/api/v1/recettes/mesRecettes';

=======
  private apiUrl7 =
    'http://localhost:8083/api/v1/recettes/recettesByCategorie/';

  private token = localStorage.getItem('access_token');
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );
>>>>>>> ef26498a914a76a4a78d0f1cfa0e20ba05ee6c42

  constructor(private http: HttpClient) {}

  getRecettes(): Observable<Recette> {
    return this.http.get<Recette>(this.apiUrl2);
  }

  getRecetteById(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl4}/${id}`);
  }
  getMesRecette(id: number): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.apiUrl8}/${id}`);
  }

  createRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.apiUrl1, recette, {
      headers: this.headers
    });
  }

  updateRecette(id: number, recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.apiUrl3}/${id}`, recette, {
      headers: this.headers
    });
  }

  deleteRecette(id: number): Observable<Recette> {
    return this.http.delete<Recette>(`${this.apiUrl5}/${id}`, {
      headers: this.headers
    });
  }

  public getQuantite(): Observable<Quantite> {
    return this.http.get(this.apiUrl6);
  }
  public recettesByCategorie(id?: number): Observable<Recette> {
    return this.http.get(this.apiUrl7 + id);
  }
}
