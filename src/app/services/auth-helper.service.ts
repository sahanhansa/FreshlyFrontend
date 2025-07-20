import { Injectable } from '@angular/core';

export type UserRole = 'admin' | 'laundry' | 'customer' | 'driver';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  constructor() { }

  /**
   * Clear all user data from localStorage
   */
  clearAllUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('laundryId');
    localStorage.removeItem('laundryName');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('currentPage');
  }

  /**
   * Store admin login data and clear other user data
   */
  storeAdminLogin(token: string, username: string, userId: string): void {
    this.clearAllUserData();
    localStorage.setItem('token', token);
    localStorage.setItem('adminId', userId);
    localStorage.setItem('adminUsername', username);
    localStorage.setItem('currentPage', 'admin');
  }

  /**
   * Store laundry login data and clear other user data
   */
  storeLaundryLogin(token: string, username: string, userId: string): void {
    this.clearAllUserData();
    localStorage.setItem('token', token);
    localStorage.setItem('laundryId', userId);
    localStorage.setItem('laundryName', username);
    localStorage.setItem('currentPage', 'laundry');
  }

  /**
   * Store customer login data and clear other user data
   */
  storeCustomerLogin(token: string, username: string, userId: string): void {
    this.clearAllUserData();
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('currentPage', 'customer');
  }

  /**
   * Store driver login data and clear other user data
   */
  storeDriverLogin(token: string, username: string, userId: string): void {
    this.clearAllUserData();
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('currentPage', 'driver');
  }

  /**
   * Get current user role based on localStorage
   */
  getCurrentUserRole(): UserRole | null {
    if (localStorage.getItem('adminId') && localStorage.getItem('adminUsername')) {
      return 'admin';
    } else if (localStorage.getItem('laundryId') && localStorage.getItem('laundryName')) {
      return 'laundry';
    } else if (localStorage.getItem('userId') && localStorage.getItem('username')) {
      // Check if it's driver based on URL or stored role
      const currentPage = localStorage.getItem('currentPage');
      if (currentPage === 'driver') {
        return 'driver';
      }
      return 'customer';
    }
    return null;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Logout - clear all data
   */
  logout(): void {
    this.clearAllUserData();
  }
} 