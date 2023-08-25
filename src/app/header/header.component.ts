import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUrl= '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Subscribe to router events to track the current URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the currentUrl variable with the current URL
        this.currentUrl = event.url;
      }
    });
  }
  viewRecettes(): void {
    this.router.navigate(['recettes']);
  }

  addRecette(): void {
    this.router.navigate(['recettes/add']);
  }

  login(): void {
    this.router.navigate(['login']);
  }

  status = false;

  addToggle() {
    this.status = !this.status;
  }



  //Flexing of the header during entering the recette page
  isAddRecettesPage() {
    return this.currentUrl === '/recettes_add';
  }

  isUpdateRecettePage() {
    return this.currentUrl.includes('/recettes/update/');
  }

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    console.log("Hello from logout");
  }
}
