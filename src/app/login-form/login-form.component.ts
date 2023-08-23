
import { RegisterRequest } from './../models/register-request';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Personne } from '../models/personne';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginFormComponent {

  image_login: any = './assets/images/loginImage4.jpg';
  image_backgound_login: any = '../assets/images/loginImage.jpg';

  user: Personne = {};

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.user != undefined) {
      this.authService.login(this.user).subscribe(
        (data) => {
          // Successful login, now check if the user is authenticated
          if (this.authService.isAuthenticated()) {
            // Redirect the user to a protected page (e.g., dashboard)
            this.router.navigate(['/recettes']);
          } else {
            console.error('Authentication failed');
          }
        },
        (error: any) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
