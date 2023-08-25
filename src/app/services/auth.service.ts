import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Personne } from '../models/personne';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Personne): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/authenticate`, user, { responseType: 'arraybuffer' })
      .pipe(
        tap(response => {
          // Convert the ArrayBuffer to a string
          const token = new TextDecoder().decode(response);

          // Parse the received token as JSON
          const tokenData = JSON.parse(token);

          // Store the access token and refresh token in localStorage
          localStorage.setItem('access_token', tokenData.access_token);
          localStorage.setItem('refresh_token', tokenData.refresh_token);

        }),
        catchError(err => {
          console.error('Login failed', err);
          return err; // Return the error for further handling if needed
        })
      );
  }

  register(user: Personne): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/register`, user, { responseType: 'arraybuffer' })
      .pipe(
        tap(response => {
          // Convert the ArrayBuffer to a string
          const token = new TextDecoder().decode(response);

          // Parse the received token as JSON
          const tokenData = JSON.parse(token);

          // Store the access token and refresh token in localStorage
          localStorage.setItem('access_token', tokenData.access_token);
          localStorage.setItem('refresh_token', tokenData.refresh_token);

        }),
        catchError(err => {
          console.error('Registration failed', err);
          return err; // Return the error for further handling if needed
        })
      );
  }

  // logout(): Observable<any> {
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem('access_token')}`
  //   };

  //   const options = {
  //     headers: new HttpHeaders(headers)  // Pass the headers as an HttpHeaders object
  //   };

  //   return this.http.post<any>(`${this.baseUrl}/api/v1/auth/logout`, null, options)
  //     .pipe(
  //       tap(() => {
  //         // Clear tokens from localStorage
  //         localStorage.removeItem('access_token');
  //         localStorage.removeItem('refresh_token');
  //         this.router.navigate(['/login']);
  //       }),
  //       catchError(err => {
  //         console.error('Logout failed', err);
  //         return err; // Return the error for further handling if needed
  //       })
  //     );
  // }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }




  refreshToken(): Observable<any> {
    // Implement token refresh logic using the refresh token
    // Make a request to your server's refresh token endpoint
    // and update tokens if the refresh is successful
    // You should update storeTokens() method accordingly

    // For example:
    return this.http.post<any>(`${this.baseUrl}/api/v1/auth/refresh-token`, {
      refresh_token: localStorage.getItem('refresh_token')
    }).pipe(
      tap(newTokens => {
        this.storeTokens(newTokens);
      }),
      catchError(err => {
        console.error('Token refresh failed', err);
        return err; // Return the error for further handling if needed
      })
    );
  }

  private storeTokens(tokens: any): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return accessToken !== null; // Return true if there's an access token
  }
}
