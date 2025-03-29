import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/shared/footer/footer.component";
import { LaundryListComponent } from "./components/order/laundry-list/laundry-list.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, LaundryListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
