import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { LunLoginComponent } from './components/laundry/login/lun-login.component';
import { DriverLoginComponent } from './components/driver/login/driver-login.component';
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
import { DriverProfilePageComponent } from './pages/Driver/driver-profile-page/driver-profile-page.component';
import { CompleteTasksPageComponent } from './pages/Driver/complete-tasks-page/complete-tasks-page.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { EditDetailsFormComponent } from './pages/Driver/edit-details-form/edit-details-form.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { CusHomeComponent } from './components/customer/cus-home/cus-home.component';
import { LaundrySignupComponent } from './components/customer/laundry-signup/laundry-signup.component';
import { HowItWorksComponent } from './components/customer/how-it-works/how-it-works.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NewOrdersComponent } from './pages/Laundry/new-orders/new-orders.component';
import { processingOrdersComponent } from './pages/Laundry/processing-orders/processing-orders.component';
import { CompletedOrdersComponent } from './pages/Laundry/completed-orders/completed-orders.component';
import { ConfirmOrdersComponent } from './pages/Laundry/confirm-orders/confirm-orders.component';
import { InvoiceSuccessedComponent } from './pages/Laundry/invoice-successed/invoice-successed.component';
import { LaundryFeedbacksComponent } from './pages/Laundry/laundry-feedbacks/laundry-feedbacks.component';
import { LaundryItemsComponent } from './pages/Laundry/laundry-items/laundry-items.component';
import { LaundryOrdersComponent } from './pages/Laundry/laundry-orders/laundry-orders.component';
import { LaundryProfileComponent } from './pages/Laundry/laundry-profile/laundry-profile.component';
import { LaundrySummaryComponent } from './pages/Laundry/laundry-summary/laundry-summary.component';
import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';
import { BasketComponent } from './pages/order/basket/basket.component';
import { ItemPageComponent } from './pages/order/item-list-page/item-list-page.component';
import { CustomerLayoutComponent } from './components/customer/customer-layout/customer-layout.component';
import { LaundryAddItemComponent } from './pages/Laundry/laundry-add-item/laundry-add-item.component';
import { LaundryEditItemComponent } from './pages/Laundry/laundry-edit-item/laundry-edit-item.component';
import { LaundryDeleteConfirmationComponent } from './pages/Laundry/laundry-delete-confirmation/laundry-delete-confirmation.component';
import {LaundryOrderSummaryComponent } from './pages/Laundry/laundry-order-summary/laundry-order-summary.component';
import { LogoutPageComponent } from './pages/Driver/logout-page/logout-page.component';
// import {LaundryHomeComponent} from './components/laundry/laundry-home/laundry-home.component';
import {AdminLoginComponent} from './components/admin/login/admin-login.component';




// Define the application's routes
export const routes: Routes = [

   // Landing page at root
    { path: '', component: LandingPageComponent, pathMatch: 'full' },

    // Route to identify the user type
    { path: 'whoareyou', component: WhoAreYouComponent }, 

    // Route for user login
    {path:'cus-login', component: LoginComponent},    // Route for general user signup
    {path:'lun-login', component: LunLoginComponent},    // Route for general user signup
    {path:'driver-login', component: DriverLoginComponent},    // Route for general user signup
    {path:'admin-login', component: AdminLoginComponent},    // Route for general user signup
    {path:'signup', component: SignupComponent},    // Route for customer home page
    //{ path: 'cus-home', component: CusHomeComponent },    // Route for laundry partner home page
  

   // Route for admin home page - redirect to admin dashboard
  { path: 'admin-home', component: AdminDashboardComponent},

 
 

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
  {path: 'delivery-order-details/:id', component: DeliveryPendingOrderDetailsComponent}, 
  {path: 'driver-profile-page', component: DriverProfilePageComponent},
  {path: 'complete-tasks-page',component: CompleteTasksPageComponent} ,
  {path: 'edit-details-form', component: EditDetailsFormComponent},
  {path: 'logout-page', component: LogoutPageComponent},
  
  
  
  // Admin routes with nested paths
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
      { path: 'laundries', component: LaundryPageComponent },
    ]
  },
  
  
 // Route for laundry home
   {path: 'laundry-home', component: HomeComponent},
   
  { path: 'laundry-home', redirectTo: '/laundry/home', pathMatch: 'full' },

   // Route for laundry-specific signup
  {path: 'laundry-signup', component:LaundrySignupComponent},
  
     // Route for new orders page
  {path: 'new-orders', component:NewOrdersComponent},

    // Route for processingorders page
  {path: 'processing-orders', component:processingOrdersComponent},

    // Route for completed orders page
  {path: 'completed-orders', component:CompletedOrdersComponent},

 // Route for confirm orders page
  {path: 'confirm-orders', component:ConfirmOrdersComponent},

  // Route for invoice success page
   {path: 'invoice-successed', component:InvoiceSuccessedComponent},

    // Route for laundry-orders page
   {path: 'laundry-orders', component:LaundryOrdersComponent},

    // Route for laundry-feedbacks page
   {path: 'laundry-feedbacks', component:LaundryFeedbacksComponent},

    // Route for laundry-items page
   {path: 'laundry-items', component:LaundryItemsComponent},

    // Route for laundry-profile page
    {path: 'laundry-profile', component:LaundryProfileComponent},

    // Route for laundry-summary page
    {path: 'laundry-summary', component:LaundrySummaryComponent},


     {path: 'laundry-add-item', component:LaundryAddItemComponent},

     {path: 'laundry-edit-item/:id', component:LaundryEditItemComponent },

     {path: 'laundry-delete-confirmation/:id', component:LaundryDeleteConfirmationComponent },

    {path: 'order-summary', component:LaundryOrderSummaryComponent },

    

    
    ]


// Define the routing module
 @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}


