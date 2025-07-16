import { Component } from '@angular/core';


import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
    imports: [CommonModule, RouterLink]
})
export class DriverProfileComponent {
  driver = {
    name: 'Janidu Tharaka',
    id: 'D2347',
    licenseNumber: 'DL123456',
    email: 'am@gmail.com',
    contact: '079 123 4567',
    address: 'No.62, YakabeddaRoad, Akuressa, Matara',
    vehicleNo: '2456',
    location: 'Matara',
    photoUrl: 'assets/driver-photo.jpg',
  };
}
