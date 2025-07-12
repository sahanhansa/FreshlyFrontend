import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-cus-home',
  templateUrl: './cus-home.component.html',
  styleUrls: ['./cus-home.component.css'],
  standalone: true,
  imports: [RouterModule,NavbarComponent,FooterComponent]   // 👈 add this
})
export class CusHomeComponent  {
  constructor(private router: Router) {}  

  onSubmit() {
    this.router.navigate(['/how-it-works']);  
  }
}
