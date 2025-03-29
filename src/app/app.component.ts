import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/shared/footer/footer.component";
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent,PaginationComponent,Navbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
