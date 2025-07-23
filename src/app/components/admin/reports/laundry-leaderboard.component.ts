import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface LaundryLeaderboardItem {
  laundryId: string;
  laundryName: string;
  city: string;
  averageRating: number;
}

@Component({
  selector: 'app-laundry-leaderboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h4 class="text-gray-600 mb-4 text-lg font-semibold">Laundry Leaderboard</h4>
      <div *ngIf="isLoading" class="flex items-center gap-2 text-blue-500 font-semibold py-6 justify-center">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
        Loading leaderboard...
      </div>
      <div *ngIf="error" class="text-red-500 text-center py-6 font-semibold">
        Failed to load leaderboard. Please try again later.
      </div>
      <ng-container *ngIf="!isLoading && !error">
        <table *ngIf="leaderboard.length > 0" class="min-w-full table-auto rounded-lg overflow-hidden">
          <thead>
            <tr class="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-white">
              <th class="px-4 py-2 text-left">#</th>
              <th class="px-4 py-2 text-left">Laundry</th>
              <th class="px-4 py-2 text-left">City</th>
              <th class="px-4 py-2 text-left">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of leaderboard; let i = index"
                [ngClass]="{
                  'bg-yellow-100 font-bold text-yellow-800': i === 0,
                  'bg-gray-100 font-semibold text-gray-800': i === 1,
                  'bg-orange-100 font-semibold text-orange-800': i === 2,
                  'bg-white': i % 2 === 0 && i > 2,
                  'bg-blue-50': i % 2 === 1 && i > 2
                }"
                class="transition-colors duration-200 hover:bg-cyan-100">
              <td class="px-4 py-2">{{ i + 1 }}</td>
              <td class="px-4 py-2">{{ item.laundryName }}</td>
              <td class="px-4 py-2">{{ item.city }}</td>
              <td class="px-4 py-2 font-semibold">{{ item.averageRating | number:'1.1-2' }}</td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="leaderboard.length === 0" class="text-gray-400 text-center py-4">No data available.</div>
      </ng-container>
    </div>
  `,
  styles: [`
    table {
      border-collapse: separate;
      border-spacing: 0;
    }
    thead tr {
      border-radius: 0.5rem 0.5rem 0 0;
    }
    tbody tr {
      transition: background 0.2s;
    }
    tbody tr:hover {
      filter: brightness(0.97);
    }
    th, td {
      border-bottom: 1px solid #e5e7eb;
    }
    th:first-child, td:first-child {
      border-left: none;
    }
    th:last-child, td:last-child {
      border-right: none;
    }
  `]
})
export class LaundryLeaderboardComponent implements OnInit {
  leaderboard: LaundryLeaderboardItem[] = [];
  isLoading = false;
  error = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() errorChange = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.error = false;
    this.loadingChange.emit(true);
    this.errorChange.emit(false);
    this.http.get<LaundryLeaderboardItem[]>(`${environment.apiUrl}/api/Laundry/laundry-list-for-customer`).subscribe({
      next: (data: any) => {
        this.leaderboard = (data || []).map((item: any) => ({
          laundryId: item.laundryId,
          laundryName: item.laundryName,
          city: item.city || '',
          averageRating: item.averageRating ?? 0
        })).sort((a: LaundryLeaderboardItem, b: LaundryLeaderboardItem) => b.averageRating - a.averageRating);
        this.isLoading = false;
        this.error = false;
        this.loadingChange.emit(false);
        this.errorChange.emit(false);
      },
      error: (err) => {
        this.leaderboard = [];
        this.isLoading = false;
        this.error = true;
        this.loadingChange.emit(false);
        this.errorChange.emit(true);
      }
    });
  }
}
