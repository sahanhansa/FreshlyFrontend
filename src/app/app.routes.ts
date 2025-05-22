import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { SignupComponent } from './components/customer/signup/signup.component';
import { WhoAreYouComponent } from './components/customer/whoareyou/whoareyou.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { LaundryHomeComponent } from './components/customer/laundry-home/laundry-home.component';
import { CusHomeComponent } from './components/customer/cus-home/cus-home.component';
import { LaundrySignupComponent } from './components/customer/laundry-signup/laundry-signup.component';
import { HowItWorksComponent } from './components/customer/how-it-works/how-it-works.component';



// Import admin components
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { DriversComponent } from './components/admin/drivers/drivers.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { LaundriesComponent } from './components/admin/laundries/laundries.component';
import { ComplaintsComponent } from './components/admin/complaints/complaints.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

// Define the application's routes
export const routes: Routes = [

   // Redirect empty path to 'whoareyou' page
    { path: '', redirectTo: '/whoareyou', pathMatch: 'full' },

    // Route to identify the user type
    { path: 'whoareyou', component: WhoAreYouComponent }, 

    // Route for user login
    {path:'login', component: LoginComponent},

    // Route for general user signup
    {path:'signup', component: SignupComponent},

     // Route for customer home page
    { path: 'cus-home', component: CusHomeComponent },

    // Route for laundry partner home page
    { path: 'laundry-home', component: LaundryHomeComponent },     // Route for laundry-specific signup
    {path: 'laundry-signup', component:LaundrySignupComponent},    // Route for how-it-works
    {path: 'how-it-works', component:HowItWorksComponent},

    // Route for customer order
    {path: 'order', loadComponent: () => import('./components/customer/order/order.component').then(c => c.OrderComponent)},
          // Admin routes
    { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    { path: 'admin/dashboard', component: AdminDashboardComponent },    
    { path: 'admin/customers', component: CustomersComponent },
    { path: 'admin/drivers', component: DriversComponent },
    { path: 'admin/orders', component: OrdersComponent },
    { path: 'admin/vehicles', component: VehiclesComponent },
    { path: 'admin/laundries', component: LaundriesComponent },
    { path: 'admin/complaints', component: ComplaintsComponent },
    { path: 'admin/reports', component: ReportsComponent },
    
    // Legacy admin routes (redirects to avoid breaking existing links)
    { path: 'customers', redirectTo: '/admin/customers', pathMatch: 'full' },
    { path: 'drivers', redirectTo: '/admin/drivers', pathMatch: 'full' },
    { path: 'orders', redirectTo: '/admin/orders', pathMatch: 'full' },
    { path: 'vehicles', redirectTo: '/admin/vehicles', pathMatch: 'full' },
    { path: 'laundries', redirectTo: '/admin/laundries', pathMatch: 'full' },
    { path: 'complaints', redirectTo: '/admin/complaints', pathMatch: 'full' },
    { path: 'reports', redirectTo: '/admin/reports', pathMatch: 'full' }
];
// Define the routing module
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

