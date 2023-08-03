import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signUpUrl = 'http://localhost:8083/api/v1/utilisateurs/inscrire';

  constructor(private http: HttpClient) {}

  signUp(data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.signUpUrl, data).subscribe(
        (response: any) => {
          // The sign-up was successful
          resolve(true);
        },
        (error) => {
          // The sign-up failed
          reject(error);
        }
      );
    });
  }}
