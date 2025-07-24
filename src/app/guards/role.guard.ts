import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token'); // or sessionStorage if you store it there
    if (token) {
      return true; // allow access
    } else {
      // redirect to login page
      return this.router.createUrlTree(['/whoareyou']);
    }
  }
}
