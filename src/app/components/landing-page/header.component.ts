import { Component } from '@angular/core';
import { RouterModule,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class HeaderComponent {
  // You can add properties or methods here if needed in future
}
