import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDriverService, Driver, Order } from '../../../services/admin/admin-driver.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface DisplayDriver {
  driverId: string;
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  addressId: string;
  accountStatus: string;
  profileImageUrl: string;
}

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {
  drivers: DisplayDriver[] = [];
  selectedDriver: DisplayDriver | null = null;
  searchQuery: string = '';
  entriesPerPage: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;
  error: string | null = null;
  constructor(public driverService: AdminDriverService) {}

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
      .subscribe((drivers: any[]) => {
        this.drivers = drivers.map((driver: any) => ({
          driverId: driver.driverId || driver.id || '',
          firstName: driver.firstName || '',
          lastName: driver.lastName || '',
          email: driver.email || '',
          licenseNumber: driver.licenseNumber || driver.licensNo || '',
          addressId: driver.addressId || (driver.address?.addressId ?? ''),
          accountStatus: driver.accountStatus === null || driver.accountStatus === '' ? 'Inactive' : driver.accountStatus || 'Inactive',
          profileImageUrl: driver.profileImageUrl || 'assets/images/driver.png'
        }));
        this.isLoading = false;
        if (this.drivers.length > 0) {
          this.selectDriver(this.drivers[0]);
        } else {
          this.selectedDriver = null;
        }
      });
  }

  // Helper to get full name
  getFullName(driver: DisplayDriver | null): string {
    if (!driver) return '';
    return `${driver.firstName} ${driver.lastName}`.trim();
  }

  // Helper to get address as string
  getAddress(driver: DisplayDriver | null): string {
    if (!driver) return 'No address provided';
    return driver.addressId ? `Address ID: ${driver.addressId}` : 'No address provided';
  }

  selectDriver(driver: DisplayDriver | null): void {
    this.selectedDriver = driver;
  }

  searchDrivers(): void {
    if (!this.searchQuery.trim()) {
      this.loadDrivers();
      return;
    }
    this.isLoading = true;
    const query = this.searchQuery.trim().toLowerCase();
    setTimeout(() => {
      this.drivers = this.drivers.filter(driver =>
        (driver.driverId || '').toLowerCase().includes(query) ||
        (driver.firstName || '').toLowerCase().includes(query) ||
        (driver.lastName || '').toLowerCase().includes(query) ||
        (driver.email || '').toLowerCase().includes(query) ||
        (driver.licenseNumber || '').toLowerCase().includes(query) ||
        (driver.addressId || '').toLowerCase().includes(query) ||
        (driver.accountStatus || '').toLowerCase().includes(query)
      );
      this.isLoading = false;
      if (this.drivers.length > 0) {
        this.selectDriver(this.drivers[0]);
      } else {
        this.selectedDriver = null;
      }
    }, 300);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  toggleOrderDetails(order: Order): void {
    order.isExpanded = !order.isExpanded;
  }

  removeUser(driver: DisplayDriver): void {
    if (!driver || !driver.driverId) return;
    this.isLoading = true;
    this.driverService.removeDriver(driver.driverId)
      .pipe(
        catchError(error => {
          this.error = 'Failed to remove driver.';
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe(result => {
        this.isLoading = false;
        this.loadDrivers();
      });
  }

  restoreUser(driver: DisplayDriver): void {
    if (!driver || !driver.driverId) return;
    this.isLoading = true;
    this.driverService.restoreDriver(driver.driverId)
      .pipe(
        catchError(error => {
          this.error = 'Failed to restore driver.';
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe(result => {
        this.isLoading = false;
        this.loadDrivers();
      });
  }
}