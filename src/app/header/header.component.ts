import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUrl= '';

  constructor(private router: Router) { }

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

  ngOnInit() {
    // Subscribe to router events to track the current URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the currentUrl variable with the current URL
        this.currentUrl = event.url;
      }
    });
  }

  isAddRecettesPage() {
    return this.currentUrl === '/recettes/add';
  }

  isUpdateRecettePage() {
    return this.currentUrl.includes('/recettes/update/');
  }
}
