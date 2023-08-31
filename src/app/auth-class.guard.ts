import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
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

    const requiredRole = route.data['requiredRoles'] as string;

    if (!requiredRole) {
      return true;
    }

    return this.authService.isUserInRole(requiredRole).pipe(
      map((isInRole: any) => {
        if (isInRole) {
          return true;
        } else {
          return this.router.createUrlTree(['/404']);
        }
      })
    );
  }

}
