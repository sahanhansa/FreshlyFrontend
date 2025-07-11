import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from '../../../components/driver/logout/logout.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
@Component({  
  selector: 'app-logout-page',
  imports: [CommonModule,  LogoutComponent],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.scss'
})
export class LogoutPageComponent {

}
