import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LaundriesComponent } from './components/laundries/laundries.component';
import { OrdersComponent } from './components/orders/orders.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'laundries', component: LaundriesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
