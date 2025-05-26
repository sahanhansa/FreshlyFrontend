import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { SignupComponent } from './components/customer/signup/signup.component';
import { WhoAreYouComponent } from './components/customer/whoareyou/whoareyou.component';
import { HomeComponent } from './pages/Laundry/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { DriverHomePageComponent } from './pages/Driver/driver-home-page/driver-home-page.component';
import { PickupsTasksMainpageComponent } from './pages/Driver/pickups-tasks-mainpage/pickups-tasks-mainpage.component';
import { PickupsPendingOrderDetailsComponent } from './pages/Driver/pickups-pending-order-details/pickups-pending-order-details.component';
import { DeliveryTasksMainpageComponent } from './pages/Driver/delivery-tasks-mainpage/delivery-tasks-mainpage.component';
import { DeliveryPendingOrderDetailsComponent } from './pages/Driver/delivery-pending-order-details/delivery-pending-order-details.component';
import { DriverContactusPageComponent } from './pages/Driver/driver-contactus-page/driver-contactus-page.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { CusHomeComponent } from './components/customer/cus-home/cus-home.component';
import { LaundrySignupComponent } from './components/customer/laundry-signup/laundry-signup.component';
import { HowItWorksComponent } from './components/customer/how-it-works/how-it-works.component';
import { NewOrdersComponent } from './pages/Laundry/new-orders/new-orders.component';
import { ConfirmOrdersComponent } from './pages/Laundry/confirm-orders/confirm-orders.component';
import { InvoiceSuccessedComponent } from './pages/Laundry/invoice-successed/invoice-successed.component';
import { LaundryFeedbacksComponent } from './pages/Laundry/laundry-feedbacks/laundry-feedbacks.component';
import { LaundryItemsComponent } from './pages/Laundry/laundry-items/laundry-items.component';
import { LaundryLayoutComponent } from './components/laundry/laundry-layout/laundry-layout.component';
import { LaundryOrdersComponent } from './pages/Laundry/laundry-orders/laundry-orders.component';
import { LaundryProfileComponent } from './pages/Laundry/laundry-profile/laundry-profile.component';
import { LaundrySummaryComponent } from './pages/Laundry/laundry-summary/laundry-summary.component';
import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';
import { BasketComponent } from './pages/order/basket/basket.component';
import { ItemPageComponent } from './pages/order/item-list-page/item-list-page.component';
import { CustomerLayoutComponent } from './components/customer/customer-layout/customer-layout.component';
import { RegularOrdersComponent } from './pages/Laundry/regular-orders/regular-orders.component';
import { ExpressOrderComponent } from './pages/Laundry/express-order/express-order.component';

// Define the application's routes
export const routes: Routes = [

   // Redirect empty path to 'whoareyou' page
    { path: '', redirectTo: '/whoareyou', pathMatch: 'full' },

    // Route to identify the user type
    { path: 'whoareyou', component: WhoAreYouComponent }, 

    // Route for user login
    {path:'login', component: LoginComponent},    // Route for general user signup
    {path:'signup', component: SignupComponent},    // Route for customer home page
    //{ path: 'cus-home', component: CusHomeComponent },    // Route for laundry partner home page
    { path: 'laundry-home', redirectTo: '/laundry/home', pathMatch: 'full' },

   // Route for admin home page - redirect to admin dashboard
  { path: 'admin-home', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    // Route for laundry-specific signup
  {path: 'laundry-signup', component:LaundrySignupComponent},
  // Redirects for laundry pages to the new layout
  { path: 'new-orders', redirectTo: '/laundry/new-orders', pathMatch: 'full' },
  { path: 'confirm-orders', redirectTo: '/laundry/confirm-orders', pathMatch: 'full' },
  { path: 'invoice-successed', redirectTo: '/laundry/invoice-successed', pathMatch: 'full' },
  { path: 'laundry-orders', redirectTo: '/laundry/orders', pathMatch: 'full' },
  { path: 'laundry-feedbacks', redirectTo: '/laundry/feedbacks', pathMatch: 'full' },
  { path: 'laundry-items', redirectTo: '/laundry/items', pathMatch: 'full' },
  { path: 'laundry-profile', redirectTo: '/laundry/profile', pathMatch: 'full' },
  { path: 'laundry-summary', redirectTo: '/laundry/summary', pathMatch: 'full' },
  { path: 'regular-orders', redirectTo: '/laundry/regular-orders', pathMatch: 'full' },
  { path: 'express-orders', redirectTo: '/laundry/express-orders', pathMatch: 'full' },

    //order routes
  //   { path: '', redirectTo: 'order', pathMatch: 'full' },
  // { path: 'order', component: LaundryPageComponent },
  // { path: 'basket', component: BasketComponent },
  // {path: 'laundry/:id', component: ItemPageComponent},
  //driver routes
  {path: 'driver-home-page', component:DriverHomePageComponent },
  {path: 'pickups-tasks-mainpage', component: PickupsTasksMainpageComponent },
  {path: 'delivery-tasks-mainpage', component: DeliveryTasksMainpageComponent},
  {path: 'driver-contactus-page', component: DriverContactusPageComponent},
  {path: 'order-details-pending/:id', component: PickupsPendingOrderDetailsComponent}, 
  {path: 'delivery-order-details/:id', component: DeliveryPendingOrderDetailsComponent},  // Admin routes with nested paths
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'drivers', loadComponent: () => import('./components/admin/drivers/drivers.component').then(m => m.DriversComponent) },
      { path: 'customers', loadComponent: () => import('./components/admin/customers/customers.component').then(m => m.CustomersComponent) },
      { path: 'laundries', loadComponent: () => import('./components/admin/laundries/laundries.component').then(m => m.LaundriesComponent) },
      { path: 'orders', loadComponent: () => import('./components/admin/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'vehicles', loadComponent: () => import('./components/admin/vehicles/vehicles.component').then(m => m.VehiclesComponent) },
      { path: 'complaints', loadComponent: () => import('./components/admin/complaints/complaints.component').then(m => m.ComplaintsComponent) },
      { path: 'reports', loadComponent: () => import('./components/admin/reports/reports.component').then(m => m.ReportsComponent) }
    ]
  },

  // Customer interface with layout (navbar + footer)
  {
    path: 'cus-home',
    component: CustomerLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CusHomeComponent }, 
      {path: 'how-it-works', component:HowItWorksComponent},
      { path: 'order', component: LaundryPageComponent },      // Laundry list page
      { path: 'basket', component: BasketComponent },
      {path: 'laundry/:id', component: ItemPageComponent},
      // Replace with actual profile component if needed
      // Add more customer pages as needed
    ]
  },
  // Laundry interface with layout (navbar + footer)
  {
    path: 'laundry',
    component: LaundryLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'orders', component: LaundryOrdersComponent },
      { path: 'items', component: LaundryItemsComponent },
      { path: 'feedbacks', component: LaundryFeedbacksComponent },
      { path: 'profile', component: LaundryProfileComponent },
      { path: 'summary', component: LaundrySummaryComponent },
      { path: 'new-orders', component: NewOrdersComponent },
      { path: 'confirm-orders', component: ConfirmOrdersComponent },
      { path: 'invoice-successed', component: InvoiceSuccessedComponent },
      { path: 'regular-orders', component: RegularOrdersComponent },
      { path: 'express-orders', component: ExpressOrderComponent }
    ]
  },

];
// Define the routing module
 @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}


