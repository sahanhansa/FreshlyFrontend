import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header with Navbar -->
      <app-header></app-header>
      
      <!-- Main Content -->
      <main class="flex-grow pt-20 pb-16">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `
})
export class LaundryLayoutComponent {
  // This component serves as a layout container
  // and doesn't need additional functionality
}