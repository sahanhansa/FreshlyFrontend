import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedItemsComponent } from './pages/Laundry/rejected-items/rejected-items.component';
import { RejectedItemDetailsComponent } from './components/laundry/rejected-item-details/rejected-item-details.component';

const routes: Routes = [  
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },  
  {
    path: 'drivers',
    loadComponent: () =>
      import('./components/admin/drivers/drivers.component').then(
        (m) => m.DriversComponent
      ),
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./components/admin/customers/customers.component').then(
        (m) => m.CustomersComponent
      ),
  },
  {
    path: 'laundries',
    loadComponent: () =>
      import('./components/admin/laundries/laundries.component').then(
        (m) => m.LaundriesComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/admin/orders/orders.component').then(
        (m) => m.OrdersComponent
      ),
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./components/admin/vehicles/vehicles.component').then(
        (m) => m.VehiclesComponent
      ),
  },
  {
    path: 'complaints',
    loadComponent: () =>
      import('./components/admin/complaints/complaints.component').then(
        (m) => m.ComplaintsComponent
      ),
  },  
  {
    path: 'reports',
    loadComponent: () =>
      import('./components/admin/reports/reports.component').then(
        (m) => m.ReportsComponent
      ),
  },
  { path: 'laundry/rejected-items', component: RejectedItemsComponent },
  { path: 'laundry/rejected-items/:id', component: RejectedItemDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}