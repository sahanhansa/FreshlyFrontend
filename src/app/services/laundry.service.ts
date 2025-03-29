//helper that provides data or functionality to your components
import { Injectable } from '@angular/core'; //marks the class as a service that can be injected into other Angular components or services
import { Laundry } from '../models/laundry.model';

@Injectable({
  providedIn: 'root' //Angular creates a singleton instance of this service and makes it available throughout the application
})
export class LaundryService {
  private laundries: Laundry[] = [ //Each object follows the Laundry interface, with properties like id, name, location, rating, and imageUrl
    { id: 1, name: 'Spark Cleaners', location: 'Negombo', rating: 5, imageUrl: 'assets/laundry.png' },
    { id: 2, name: 'Fresh Wash', location: 'Bambalapitiya', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 3, name: 'Quick Dry', location: 'Colombo 7', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 4, name: 'Laundry Express', location: 'Narahenpita', rating: 3, imageUrl: 'assets/laundry.png' },
    { id: 5, name: 'Clean & Fresh', location: 'Maharagama', rating: 2, imageUrl: 'assets/laundry.png' },
    { id: 6, name: 'Quick Wash', location: 'Dehiwala', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 7, name: 'Laundry Experts', location: 'Nugegoda', rating: 5, imageUrl: 'assets/laundry.png' },
    { id: 8, name: 'Clean & Clean', location: 'Kollupitiya', rating: 3, imageUrl: 'assets/laundry.png' },
    { id: 9, name: 'Spark Cleaners', location: 'Negombo', rating: 5, imageUrl: 'assets/laundry.png' },
    { id: 10, name: 'Fresh Wash', location: 'Bambalapitiya', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 11, name: 'Quick Dry', location: 'Colombo 7', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 12, name: 'Laundry Express', location: 'Narahenpita', rating: 3, imageUrl: 'assets/laundry.png' },
    { id: 13, name: 'Clean & Fresh', location: 'Maharagama', rating: 2, imageUrl: 'assets/laundry.png' },
    { id: 14, name: 'Quick Wash', location: 'Dehiwala', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 15, name: 'Laundry Experts', location: 'Nugegoda', rating: 5, imageUrl: 'assets/laundry.png' },
    { id: 16, name: 'Clean & Clean', location: 'Kollupitiya', rating: 3, imageUrl: 'assets/laundry.png' },
    { id: 17, name: 'Spark Cleaners', location: 'Negombo', rating: 5, imageUrl: 'assets/laundry.png' },
    { id: 18, name: 'Fresh Wash', location: 'Bambalapitiya', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 19, name: 'Quick Dry', location: 'Colombo 7', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 20, name: 'Laundry Express', location: 'Narahenpita', rating: 3, imageUrl: 'assets/laundry.png' },
    { id: 21, name: 'Clean & Fresh', location: 'Maharagama', rating: 2, imageUrl: 'assets/laundry.png' },
    { id: 22, name: 'Quick Wash', location: 'Dehiwala', rating: 4, imageUrl: 'assets/laundry.png' },
    { id: 23, name: 'Laundry Experts', location: 'Nugegoda', rating: 5, imageUrl: 'assets/laundry.png' },
    { id: 24, name: 'Clean & Clean', location: 'Kollupitiya', rating: 3, imageUrl: 'assets/laundry.png' }
  ];

  getLaundries(): Laundry[] {
    return this.laundries;
  }
  
}

// How these interact

// Data Flow:
// The LaundryService provides the list of laundries.
// The LaundryListComponent fetches the list of laundries from the LaundryService.
// The LaundryListComponent loops through the list and creates a LaundryCardComponent for each laundry item.
// The LaundryCardComponent receives the data for each laundry item and displays it.

// Interaction:
// Service to List: The LaundryListComponent calls the getLaundries() method from the LaundryService to get the data.
// List to Card: The LaundryListComponent passes the data for each laundry item to the LaundryCardComponent using @Input() properties.
// Card Displays Data: The LaundryCardComponent takes the data and displays it in the UI.
