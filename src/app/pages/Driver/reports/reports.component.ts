import { Component } from '@angular/core';
import { DriverNavbarComponent } from "@app/components/driver/driver-navbar/driver-navbar.component";
import { FooterComponent } from "@app/components/shared/footer/footer.component";

@Component({
  selector: 'app-reports',
  imports: [DriverNavbarComponent, FooterComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
