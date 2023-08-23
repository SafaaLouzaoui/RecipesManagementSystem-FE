import { Personne } from './../models/personne';
import { AuthService } from './../services/auth.service';
import { SignupService } from './../services/signup.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  image_login: any = './assets/images/loginImage3.jpg';
  image_backgound_login: any = '../assets/images/loginImage.jpg';
  user: Personne = {};

  constructor(
    private router: Router,
    private http: HttpClient,
    private signupService: SignupService,
    private authService: AuthService
  ) {}
  ngOnInit() {}
  register() {
    if (this.user != undefined) {
      this.authService.register(this.user).subscribe(
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
  showSuccessPopup(): void {
    alert('Sign up successful!'); // You can use a custom modal or toast message instead
  }
}
