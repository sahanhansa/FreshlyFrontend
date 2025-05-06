import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WashMethodService {
  // Define wash methods here
  private washMethods: string[] = ['Regular Wash', 'Dry Clean', 'Hand Wash', 'Press only'];

  constructor() { }

  // Method to get all wash methods
  getWashMethods(): string[] {
    return this.washMethods;
  }

  // Alternative method that returns an Observable (useful for async operations)
  getWashMethodsAsObservable(): Observable<string[]> {
    return of(this.washMethods);
  }
}
