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
import { HomePageComponent } from './components/landing-page/home-page.component';
import { ServicesPageComponent } from './components/landing-page/services-page.component';
import { AboutPageComponent } from './components/landing-page/about-page.component';
import { LaundriesPageComponent } from './components/landing-page/laundries-page.component';
import { ContactPageComponent } from './components/landing-page/contact-page.component';
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
import { ProcessingOrderDetailsComponent} from './components/laundry/processing-order-details/processing-order-details.component';
import { CompletedOrderDetailsComponent } from './components/Laundry/completed-order-details/completed-order-details.component';
import { LogoutPageComponent } from './pages/Driver/logout-page/logout-page.component';
import {AdminLoginComponent} from './components/admin/login/admin-login.component';
import { NewOrderDetailsComponent } from './components/laundry/new-order-details/new-order-details.component';
import {MultiStepFormComponent} from './components/laundry/lau-sign/multi-step-form.component';
import { RequestResetComponent } from './pages/request-reset/request-reset.component';
import { VerifyResetComponent } from './pages/verify-reset/verify-reset.component';
import {WhoAreYouComponentSign} from './components/whoareyou/whoareyou.component'

// Define the application's routes
export const routes: Routes = [

   // Landing page at root
    { path: '', component: LandingPageComponent, pathMatch: 'full' },

    // Landing page navigation routes
    { path: 'home', component: HomePageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'laundries', component: LaundriesPageComponent },
    { path: 'contact', component: ContactPageComponent },

    { path: 'request-reset', component: RequestResetComponent },
  { path: 'verify-reset', component: VerifyResetComponent },

    // Route to identify the user type
    { path: 'whoareyou', component: WhoAreYouComponent }, 
    { path: 'whoareyousign', component: WhoAreYouComponentSign }, 

    // Route for user login
    {path:'cus-login', component: LoginComponent},    // Route for general user signup
    {path:'cus-signup', component: SignupComponent},    // Route for general user signup
    {path:'lun-login', component: LunLoginComponent},    // Route for general user signup
    {path:'driver-login', component: DriverLoginComponent},    // Route for general user signup
    {path:'admin-login', component: AdminLoginComponent},    // Route for general user signup
    {path:'signup', component: SignupComponent},    // Route for customer home page
    {path:'lun-signup', component: MultiStepFormComponent},    // Route for laundry signup multi-step form
    //{ path: 'cus-home', component: CusHomeComponent },    // Route for laundry partner home page
  

   // Route for admin home page - redirect to admin dashboard
  { path: 'admin-home', component: AdminDashboardComponent},

 
 

    //order routes
  //   { path: '', redirectTo: 'order', pathMatch: 'full' },
  // { path: 'order', component: LaundryPageComponent },
  // { path: 'basket', component: BasketComponent },
  // {path: 'laundry/:id', component: ItemPageComponent},

  //driver routes
  {path: 'driver-home-page', component:DriverHomePageComponent, canActivate: [() => import('./guards/role.guard').then(m => m.RoleGuard)], data: { role: 'driver' } },
  {path: 'pickups-tasks-mainpage', component: PickupsTasksMainpageComponent },
  {path: 'delivery-tasks-mainpage', component: DeliveryTasksMainpageComponent},
  {path: 'driver-contactus-page', component: DriverContactusPageComponent},
  {path: 'order-details-pending/:id', component: PickupsPendingOrderDetailsComponent}, 
  {path: 'delivery-order-details/:id', component: DeliveryPendingOrderDetailsComponent}, 
  {path: 'driver-profile-page', component: DriverProfilePageComponent},
  {path: 'complete-tasks-page',component: CompleteTasksPageComponent} ,
  {path: 'edit-details-form', component: EditDetailsFormComponent},
  {path: 'logout-page', component: LogoutPageComponent},
  { path: 'payment', loadComponent: () => import('./components/payment/payment.component').then(m => m.PaymentComponent) },
  { path: 'payment-success', loadComponent: () => import('./components/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent) },
  { path: 'payment-cancel', loadComponent: () => import('./components/payment-cancel/payment-cancel.component').then(m => m.PaymentCancelComponent) },
  
  
  
  // Admin routes with nested paths
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [() => import('./guards/role.guard').then(m => m.RoleGuard)],
    data: { role: 'admin' },
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
    canActivate: [() => import('./guards/role.guard').then(m => m.RoleGuard)],
    data: { role: 'customer' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      
      { path: 'home', component: CusHomeComponent }, 
      {path: 'how-it-works', component:HowItWorksComponent},
      { path: 'order', component: LaundryPageComponent },      // Laundry list page
      { path: 'basket', component: BasketComponent },
      {path: 'laundry/:id', component: ItemPageComponent},
      // Replace with actual profile component if needed
      { path: 'profile', loadComponent: () => import('./components/customer/profile/profile.component').then(m => m.ProfileComponent) },
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

  // Route for new order details
  {
    path: 'new-order-details/:orderId/:statusId',
    loadComponent: () => import('./components/laundry/new-order-details/new-order-details.component').then(m => m.NewOrderDetailsComponent)
  },

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

     {path: 'processing-order-details/:orderId/:statusId', component:ProcessingOrderDetailsComponent },

     {path: 'completed-order-details/:orderId/:statusId', component:CompletedOrderDetailsComponent },

     {path: 'new-order-details/:orderId/:statusId', component:NewOrderDetailsComponent }
    
    ]


// Define the routing module
 @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}


