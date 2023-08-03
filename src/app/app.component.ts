import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  isLoginPage: boolean = false;
  hideHeaderUrls: string[] = ['/login', '/signup'];
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.hideHeaderUrls.includes(event.url);
      }
    });
  }
  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }
}
