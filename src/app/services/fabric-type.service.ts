import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricTypeService {
  // Define fabric types here instead of in the component
  private fabricTypes: string[] = ['Cotton', 'Polyester', 'Linen', 'Wool', 'Silk', 'Other'];

  constructor() { }

  // Method to get all fabric types
  getFabricTypes(): string[] {
    return this.fabricTypes;
  }

  // Alternative method that returns an Observable (useful for async operations)
  getFabricTypesAsObservable(): Observable<string[]> {
    return of(this.fabricTypes);
  }
}
