import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;

}