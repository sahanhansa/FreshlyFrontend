import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  private apiUrl = `${environment.apiUrl}/api/auth`;
  
  constructor(private http: HttpClient) {
    // Check for stored user on init
    this.loadStoredUser();
  }
  
  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }
  
  getCurrentUserId(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.id : null;
  }
  
  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  // For testing/demo purposes - in real app this would come from an auth process
  setDemoUser(): void {
    const demoUser: User = {
      id: '12345678-1234-1234-1234-123456789abc', // This would be a real user ID in production
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'Customer'
    };
    this.setCurrentUser(demoUser);
  }
}