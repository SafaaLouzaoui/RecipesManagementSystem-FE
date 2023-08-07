import { Commentaire } from './../models/commentaire';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  url1 = 'http://localhost:8083/api/v1/commentaires/creer';
  url2 = 'http://localhost:8083/api/v1/commentaires/contactUs';
  url3 = 'http://localhost:8083/api/v1/commentaires/lireContacts';
  url4 = 'http://localhost:8083/api/v1/commentaires/lire';
  url5 = 'http://localhost:8083/api/v1/commentaires/lireTous';
  url6 = 'http://localhost:8083/api/v1/commentaires/modifier';
  url7 = 'http://localhost:8083/api/v1/commentaires/supprimer';

  constructor(private http: HttpClient) {}

  public getComments(): Observable<Commentaire> {
    return this.http.get(this.url5);
  }

  createComment(
    commentaire: Commentaire,
    params: HttpParams
  ): Observable<Commentaire> {
    // Append the params to the URL as query parameters
    const urlWithParams = `${this.url1}?${params.toString()}`;

    // Make the HTTP post request with the updated URL containing both parameters
    return this.http.post<Commentaire>(urlWithParams, commentaire);
  }

  deletComment(idComment: number): Observable<Commentaire> {
    return this.http.delete<Commentaire>(`${this.url7}/${idComment}`);
  }

  calculateTimeDifference(created_at?: Date): string {
    if (!created_at) {
      return 'N/A'; // Return a default value or handle the undefined case appropriately
    }
    const createdAtDate = created_at;
    const currentTime = new Date();

    const differenceInSeconds = Math.floor((currentTime.getTime() - createdAtDate.getTime()) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} days ago`;
    }
  }
}
