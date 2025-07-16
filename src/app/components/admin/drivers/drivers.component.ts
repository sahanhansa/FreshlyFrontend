import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDriverService, Driver, Order } from '../../../services/admin/admin-driver.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;
  searchQuery: string = '';
  entriesPerPage: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private driverService: AdminDriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.isLoading = true;
    this.error = null;

    this.driverService.getDrivers()
      .pipe(
        catchError(error => {
          console.error('Error fetching drivers:', error);
          this.error = 'Failed to load drivers. Please try again later.';
          return of([]);
        })
      )
      .subscribe(drivers => {
        this.drivers = drivers;
        this.isLoading = false;
        
        // Initialize with first driver selected
        if (this.drivers.length > 0) {
          this.selectDriver(this.drivers[0]);
        }
      });
  }

  // Helper to get full name
  getFullName(driver: Driver): string {
    return `${driver.firstName} ${driver.lastName}`;
  }

  // Helper to get address as string
  getAddress(driver: Driver): string {
    if (!driver.address) return 'No address provided';
    const addr = driver.address;
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`;
  }

  selectDriver(driver: Driver): void {
    this.selectedDriver = driver;
    
    // If the driver doesn't have recent orders data yet, fetch it
    if (driver && (!driver.recentOrders || driver.recentOrders.length === 0)) {
      this.loadDriverOrders(driver.driverId);
    }
  }

  loadDriverOrders(driverId: string): void {
    this.driverService.getDriverOrders(driverId)
      .pipe(
        catchError(error => {
          console.error(`Error fetching orders for driver ${driverId}:`, error);
          return of([]);
        })
      )
      .subscribe(orders => {
        if (this.selectedDriver && this.selectedDriver.driverId === driverId) {
          this.selectedDriver = {
            ...this.selectedDriver,
            recentOrders: orders
          };
        }
        
        // Also update the driver in the drivers array
        const driverIndex = this.drivers.findIndex(d => d.driverId === driverId);
        if (driverIndex !== -1) {
          this.drivers[driverIndex] = {
            ...this.drivers[driverIndex],
            recentOrders: orders
          };
        }
      });
  }

  searchDrivers(): void {
    if (!this.searchQuery.trim()) {
      this.loadDrivers();
      return;
    }
    
    // Filter locally for now, but this could be updated to use an API endpoint with server-side filtering
    this.isLoading = true;
    
    // Simulate API delay
    setTimeout(() => {
      const query = this.searchQuery.toLowerCase();
      this.drivers = this.drivers.filter(driver => 
        this.getFullName(driver).toLowerCase().includes(query) ||
        driver.email.toLowerCase().includes(query) ||
        driver.phoneNumber.includes(query) ||
        driver.vehicleNumber.toLowerCase().includes(query) ||
        (driver.address?.city || '').toLowerCase().includes(query)
      );
      
      this.isLoading = false;
      
      // Update selected driver
      if (this.drivers.length > 0) {
        if (!this.selectedDriver || !this.drivers.some(d => d.driverId === this.selectedDriver?.driverId)) {
          this.selectDriver(this.drivers[0]);
        }
      } else {
        this.selectedDriver = null;
      }
    }, 500);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // Implement pagination logic - for now we're doing client-side pagination
    // In a real implementation, this would call the API with pagination parameters
  }

  toggleOrderDetails(order: Order): void {
    order.isExpanded = !order.isExpanded;
  }
}