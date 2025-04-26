import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Complaint {
  complaintId: string;
  date: string;
  status: 'resolved' | 'unresolved';
  customerId: string;
  orderId: string;
  details?: {
    customerName: string;
    laundryDriverId: string;
    laundryDriverName: string;
    region: string;
    description: string;
    rating?: number;
  };
  isExpanded?: boolean;
}

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  complaints: Complaint[] = [
    { complaintId: '#01', date: '18/12/2024', status: 'unresolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#02', date: '18/12/2024', status: 'resolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#03', date: '18/12/2024', status: 'resolved', customerId: '#01', orderId: '18/12/2024' },
    { 
      complaintId: '#04', 
      date: '18/12/2024', 
      status: 'unresolved', 
      customerId: '#01', 
      orderId: '18/12/2024',
      details: {
        customerName: 'Arthur Morgan',
        laundryDriverId: '#0023',
        laundryDriverName: 'Abc Laundry',
        region: 'Moralawa',
        description: 'This is the users complaint about another particular user',
        rating: 0
      }
    },
    { complaintId: '#05', date: '18/12/2024', status: 'unresolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#06', date: '18/12/2024', status: 'unresolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#07', date: '18/12/2024', status: 'resolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#08', date: '18/12/2024', status: 'resolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#09', date: '18/12/2024', status: 'resolved', customerId: '#01', orderId: '18/12/2024' },
    { complaintId: '#10', date: '18/12/2024', status: 'resolved', customerId: '#01', orderId: '18/12/2024' }
  ];

  currentPage = 1;
  itemsPerPage = 9;
  searchQuery = '';

  get filteredComplaints(): Complaint[] {
    return this.complaints
      .filter(complaint => 
        this.searchQuery ? 
          complaint.complaintId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          complaint.customerId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          complaint.orderId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          complaint.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (complaint.details?.customerName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ?? false)
        : true
      );
  }

  get paginatedComplaints(): Complaint[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredComplaints.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  ngOnInit() {
    // Initialize component
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1; // Reset to first page when searching
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onEntriesChange(entries: number) {
    this.itemsPerPage = entries;
    this.currentPage = 1; // Reset to first page when changing entries per page
  }

  toggleDetails(complaint: Complaint) {
    complaint.isExpanded = !complaint.isExpanded;
  }
} 