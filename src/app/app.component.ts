import { Component } from '@angular/core';


import { RouterOutlet } from '@angular/router';
import { DeleteConfirmationComponent } from "./components/laundry/delete-confirmation/delete-confirmation.component";



@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, DeleteConfirmationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'feature-laundry';

  searchTerm: string = '';


onSearchChanged(term: string) {
  this.searchTerm = term;
  console.log('Search term:', term);


}
}