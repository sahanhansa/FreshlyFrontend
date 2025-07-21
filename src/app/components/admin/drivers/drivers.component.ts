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
  username?: string;
  password?: string;
  email: string;
  licenseNo: string;
  addressId: string;
  accountStatus: string;
  profileImageUrl: string;
  profileImage?: string;
  dateJoined?: string;
  isActive?: boolean;
  recentOrders?: Order[];
}

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {
  imageLoading: boolean = true;
  profileImageFile: File | null = null;
  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImageFile = input.files[0];
    }
  }
  showConfirmDriverModal: boolean = false;
  confirmDriverAction: 'remove' | 'restore' = 'remove';
  driverToConfirm: DisplayDriver | null = null;
  confirmRemoveDriver(driver: DisplayDriver): void {
    this.driverToConfirm = driver;
    this.confirmDriverAction = 'remove';
    this.showConfirmDriverModal = true;
  }

  confirmRestoreDriver(driver: DisplayDriver): void {
    this.driverToConfirm = driver;
    this.confirmDriverAction = 'restore';
    this.showConfirmDriverModal = true;
  }

  closeConfirmDriverModal(): void {
    this.showConfirmDriverModal = false;
    this.driverToConfirm = null;
  }
  drivers: DisplayDriver[] = [];
  selectedDriver: DisplayDriver | null = null;
  searchQuery: string = '';
  entriesPerPage: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;
  error: string | null = null;

  // Modal state for adding driver
  showAddDriverModal: boolean = false;
  // Step control for add driver modal
  addDriverStep: number = 1;

  // Add driver form data
  newDriver: {
    driverId?: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    licenseNo: string;
    address: {
      houseNo: string;
      street: string;
      city: string;
      postalCode: string;
    };
    accountStatus: string;
    vehicleNo: string;
    profileImage: string;
    contacts: Array<{
      contactNumber: string;
    }>;
  } = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    licenseNo: '',
    accountStatus: 'Active',
    address: {
      houseNo: '',
      street: '',
      city: '',
      postalCode: ''
    },
    vehicleNo: '',
    profileImage: '',
    contacts: [
      {
        contactNumber: ''
      }
    ]
  };

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
          licenseNo: driver.licenseNo || driver.licenseNumber || driver.licensNo || '',
          addressId: driver.addressId || (driver.address?.addressId ?? ''),
          accountStatus: driver.accountStatus === null || driver.accountStatus === '' ? 'Inactive' : driver.accountStatus || 'Inactive',
          profileImageUrl: driver.profileImageUrl || 'assets/images/driver.png',
          profileImage: driver.profileImage || '',
          dateJoined: driver.dateJoined || driver.joinedDate || '',
          isActive: typeof driver.isActive === 'boolean' ? driver.isActive : (driver.accountStatus === 'Active'),
          recentOrders: driver.recentOrders || []
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
    this.imageLoading = true;
    
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
    this.isLoading = true;
    const query = this.searchQuery.trim().toLowerCase();
    setTimeout(() => {
      this.drivers = this.drivers.filter(driver =>
        (driver.driverId || '').toLowerCase().includes(query) ||
        (driver.firstName || '').toLowerCase().includes(query) ||
        (driver.lastName || '').toLowerCase().includes(query) ||
        (driver.email || '').toLowerCase().includes(query) ||
        (driver.licenseNo || '').toLowerCase().includes(query) ||
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
    // Implement pagination logic - for now we're doing client-side pagination
    // In a real implementation, this would call the API with pagination parameters
  }

  toggleOrderDetails(order: Order): void {
    order.isExpanded = !order.isExpanded;
  }

  removeUser(driver: DisplayDriver): void {
    if (!driver || !driver.driverId) return;
    this.showConfirmDriverModal = false;
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
    this.showConfirmDriverModal = false;
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

  openAddDriverModal(): void {
    if (!this.newDriver.address) {
      this.newDriver.address = { houseNo: '', street: '', city: '', postalCode: '' };
    }
    this.addDriverStep = 1;
    this.showAddDriverModal = true;
  }

  closeAddDriverModal(): void {
    this.showAddDriverModal = false;
    this.addDriverStep = 1;
    // Reset form and address to avoid undefined
    this.newDriver = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      licenseNo: '',
      accountStatus: 'Active',
      address: {
        houseNo: '',
        street: '',
        city: '',
        postalCode: ''
      },
      vehicleNo: '',
      profileImage: '',
      contacts: [
        {
          contactNumber: ''
        }
      ]
    };
  }

  nextAddDriverStep(): void {
    if (this.addDriverStep === 1) {
      this.addDriverStep = 2;
    }
  }

  prevAddDriverStep(): void {
    if (this.addDriverStep === 2) {
      this.addDriverStep = 1;
    }
  }

  addDriver(): void {
    const formData = new FormData();
    // Driver fields (camelCase for backend compatibility)
    formData.append('firstName', this.newDriver.firstName);
    formData.append('lastName', this.newDriver.lastName);
    formData.append('username', this.newDriver.username);
    formData.append('password', this.newDriver.password);
    formData.append('email', this.newDriver.email);
    formData.append('licenseNo', this.newDriver.licenseNo);
    formData.append('accountStatus', 'active');
    formData.append('vehicleNo', this.newDriver.vehicleNo); // <-- Added vehicleNo
    // Address fields
    formData.append('houseNo', this.newDriver.address.houseNo);
    formData.append('street', this.newDriver.address.street);
    formData.append('city', this.newDriver.address.city);
    formData.append('postalCode', this.newDriver.address.postalCode);
    // Profile image
    if (this.profileImageFile) {
      formData.append('profileImage', this.profileImageFile);
    }
    // Send request
    this.driverService.addDriver(formData).subscribe({
      next: (driver) => {
        this.loadDrivers();
        this.closeAddDriverModal();
      },
      error: (err) => {
        alert('Failed to add driver.');
      }
    });
  }
}