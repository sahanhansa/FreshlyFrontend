import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricTypeService {
  private fabricTypes: string[] = ['Cotton', 'Polyester', 'Linen', 'Wool', 'Silk', 'Other'];

  constructor() { }

  // Method to get all fabric types
  getFabricTypes(): string[] {
    return this.fabricTypes;
  }

  // Asynchronous method that returns the fabric types as an Observable
  getFabricTypesAsObservable(): Observable<string[]> {
    return of(this.fabricTypes);
  }
}
