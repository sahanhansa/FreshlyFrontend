import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarOrderComponent } from "./components/order/navbar-order/navbar-order.component";
import { FooterComponent } from "./components/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarOrderComponent,
    FooterComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
