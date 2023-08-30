import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClassGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login']);
    }

    const requiredRoles = route.data['requiredRoles'] as string[];

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Allow access for authenticated users with no specific role requirement
    }

    if (requiredRoles && requiredRoles.some(role => this.authService.isUserInRole(role))) {
      return true;
    } else {
      return this.router.createUrlTree(['/404']);
    }
  }
}
