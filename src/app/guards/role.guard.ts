import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRole = route.data['role'];
    const userRole = localStorage.getItem('role');
    if (userRole === expectedRole) {
      return true;
    }
    // Redirect to landing page if not authorized
    return this.router.parseUrl('/');
  }
}
