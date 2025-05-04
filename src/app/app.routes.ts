import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'drivers',
    loadComponent: () => import('./components/drivers/drivers.component').then(m => m.DriversComponent)
  },
  {
    path: 'customers',
    loadComponent: () => import('./components/customers/customers.component').then(m => m.CustomersComponent)
  },
  {
    path: 'laundries',
    loadComponent: () => import('./components/laundries/laundries.component').then(m => m.LaundriesComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'vehicles',
    loadComponent: () => import('./components/vehicles/vehicles.component').then(m => m.VehiclesComponent)
  },
  {
    path: 'complaints',
    loadComponent: () => import('./components/complaints/complaints.component').then(m => m.ComplaintsComponent)
  },
  {
    path: 'reports',
    loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent)
  },
  { path: '**', redirectTo: 'admin' }
];
