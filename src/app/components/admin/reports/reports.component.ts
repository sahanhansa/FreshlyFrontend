import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DriverLeaderboard {
  name: string;
  points: number;
  correctPercentage: string;
  rank: number;
  trend: 'up' | 'down';
  image?: string;
}

interface LaundryLeaderboard {
  name: string;
  points: number;
  userCount: number;
  correctPercentage: string;
  rank: number;
  trend: 'up' | 'down';
}

interface RevenueData {
  month: string;
  amount: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  fromDate: string = '12/24/2024';
  toDate: string = '12/24/2024';
  
  // Statistics
  activeUsers = {
    current: 27,
    total: 80
  };
  
  complaintsAnswered = 3298;
  avgSessionLength = '2m 34s';
  
  knowledge = {
    starting: 64,
    current: 86,
    gain: 34
  };

  // Revenue data for the chart
  revenueData: RevenueData[] = [
    { month: 'Jan', amount: 150 },
    { month: 'Feb', amount: 180 },
    { month: 'Mar', amount: 220 },
    { month: 'Apr', amount: 270 },
    { month: 'May', amount: 250 },
    { month: 'Jun', amount: 260 },
    { month: 'Jul', amount: 180 },
    { month: 'Aug', amount: 280 },
    { month: 'Sep', amount: 320 },
    { month: 'Oct', amount: 350 },
    { month: 'Nov', amount: 380 },
    { month: 'Dec', amount: 400 }
  ];

  // Driver Leaderboard
  driverLeaderboard: DriverLeaderboard[] = [
    { name: 'Jesse Thomas', points: 637, correctPercentage: '98%', rank: 1, trend: 'up' },
    { name: 'Thisal Mathiyazhagan', points: 637, correctPercentage: '89%', rank: 2, trend: 'down' },
    { name: 'Helen Chuang', points: 637, correctPercentage: '86%', rank: 3, trend: 'up' },
    { name: 'Lura Silverman', points: 637, correctPercentage: '', rank: 4, trend: 'up' },
    { name: 'Winifred Groton', points: 637, correctPercentage: '', rank: 5, trend: 'down' },
    { name: 'Ken Alba', points: 637, correctPercentage: '', rank: 6, trend: 'up' },
    { name: 'Alice LeBeau', points: 637, correctPercentage: '', rank: 7, trend: 'down' },
    { name: 'Adrian Lu', points: 637, correctPercentage: '', rank: 8, trend: 'up' },
    { name: 'Evelyn Hamilton', points: 637, correctPercentage: '', rank: 9, trend: 'down' },
    { name: 'Rosa Fiddlebrook', points: 637, correctPercentage: '', rank: 10, trend: 'up' }
  ];

  // Laundries Leaderboard
  laundriesLeaderboard: LaundryLeaderboard[] = [
    { name: 'Houston Facility', points: 52, userCount: 52, correctPercentage: '97%', rank: 1, trend: 'up' },
    { name: 'Test Group', points: 52, userCount: 52, correctPercentage: '95%', rank: 2, trend: 'down' },
    { name: 'Sales Leadership', points: 52, userCount: 52, correctPercentage: '87%', rank: 3, trend: 'up' },
    { name: 'Northeast Region', points: 52, userCount: 52, correctPercentage: '', rank: 4, trend: 'up' },
    { name: 'Southeast Region', points: 52, userCount: 52, correctPercentage: '', rank: 5, trend: 'down' },
    { name: 'District Managers', points: 52, userCount: 52, correctPercentage: '', rank: 6, trend: 'up' },
    { name: 'Senior Managers', points: 52, userCount: 52, correctPercentage: '', rank: 7, trend: 'down' },
    { name: 'New Hires', points: 52, userCount: 52, correctPercentage: '', rank: 8, trend: 'up' },
    { name: 'Southwest Region', points: 52, userCount: 52, correctPercentage: '', rank: 9, trend: 'down' },
    { name: 'Northwest Region', points: 52, userCount: 52, correctPercentage: '', rank: 10, trend: 'up' }
  ];

  constructor() {}

  ngOnInit(): void {}

  onDateChange(): void {
    // Implement date change logic
  }

  downloadReport(): void {
    // Implement download functionality
  }
}