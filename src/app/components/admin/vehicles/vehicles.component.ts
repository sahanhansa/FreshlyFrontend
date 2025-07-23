import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Vehicle {
  vehicleId: string;
  vehicleType: string;
  driver: string;
  driverId: string;
  status: 'idle' | 'delivering';
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [
    { vehicleId: '#4621', vehicleType: '345', driver: 'Matt Dickerson', driverId: '#4621', status: 'idle' },
    { vehicleId: '#0998', vehicleType: '3223', driver: 'Wiktoria', driverId: '#0998', status: 'delivering' },
    { vehicleId: '#3762', vehicleType: 'Trixie Byrd', driver: 'Trixie Byrd', driverId: '#3762', status: 'delivering' },
    { vehicleId: '#6689', vehicleType: 'Brad Mason', driver: 'Brad Mason', driverId: '#6689', status: 'delivering' },
    { vehicleId: '#5690', vehicleType: 'Sanderson', driver: 'Sanderson', driverId: '#5690', status: 'idle' },
    { vehicleId: '#4811', vehicleType: 'Jun Redfern', driver: 'Jun Redfern', driverId: '#4811', status: 'idle' },
    { vehicleId: '#7046', vehicleType: 'Miriam Kidd', driver: 'Miriam Kidd', driverId: '#7046', status: 'delivering' },
    { vehicleId: '#1265', vehicleType: 'Dominic', driver: 'Dominic', driverId: '#1265', status: 'delivering' },
    { vehicleId: '#6800', vehicleType: 'Shanice', driver: 'Shanice', driverId: '#6800', status: 'delivering' }
  ];

  currentPage = 1;
  itemsPerPage = 9;
  searchQuery = '';

  get filteredVehicles(): Vehicle[] {
    return this.vehicles.filter(vehicle => 
      this.searchQuery ? 
        vehicle.vehicleId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        vehicle.vehicleType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        vehicle.driverId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        vehicle.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      : true
    );
  }

  get paginatedVehicles(): Vehicle[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredVehicles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  ngOnInit() {
    // Initialize component
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onEntriesChange(entries: number) {
    this.itemsPerPage = entries;
    this.currentPage = 1;
  }
}