import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { SignupComponent } from './components/customer/signup/signup.component';
import { WhoAreYouComponent } from './components/customer/whoareyou/whoareyou.component';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule} from '@angular/router';
import { HomeComponent } from './pages/Laundry/home/home.component';
=======
import { RouterModule } from '@angular/router';



//driver routes
import { DriverHomePageComponent } from './pages/Driver/driver-home-page/driver-home-page.component';
import { PickupsTasksMainpageComponent } from './pages/Driver/pickups-tasks-mainpage/pickups-tasks-mainpage.component';
import { PickupsPendingOrderDetailsComponent } from './pages/Driver/pickups-pending-order-details/pickups-pending-order-details.component';
import { DeliveryTasksMainpageComponent } from './pages/Driver/delivery-tasks-mainpage/delivery-tasks-mainpage.component';
import { DeliveryPendingOrderDetailsComponent } from './pages/Driver/delivery-pending-order-details/delivery-pending-order-details.component';
import { DriverContactusPageComponent } from './pages/Driver/driver-contactus-page/driver-contactus-page.component';


import { LaundryHomeComponent } from './components/customer/laundry-home/laundry-home.component';
>>>>>>> b0271b6d6c5d7bd609c8896f7c888e0e493386b5
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CusHomeComponent } from './components/customer/cus-home/cus-home.component';
import { LaundrySignupComponent } from './components/customer/laundry-signup/laundry-signup.component';
import { HowItWorksComponent } from './components/customer/how-it-works/how-it-works.component';
import { NewOrdersComponent } from './pages/Laundry/new-orders/new-orders.component';
import { ConfirmOrdersComponent } from './pages/Laundry/confirm-orders/confirm-orders.component';
import { InvoiceSuccessedComponent } from './pages/Laundry/invoice-successed/invoice-successed.component';



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
  { path: 'laundry-home', component: HomeComponent},

   // Route for admin home page
  { path: 'admin-home', component: AdminHomeComponent },
  
  // Route for laundry-specific signup
  {path: 'laundry-signup', component:LaundrySignupComponent},

 // Route for how-it-works
   {path: 'how-it-works', component:HowItWorksComponent},


<<<<<<< HEAD
  // Route for new orders page
  {path: 'new-orders', component:NewOrdersComponent},

 // Route for confirm orders page
  {path: 'confirm-orders', component:ConfirmOrdersComponent},

  // Route for invoice success page
   {path: 'invoice-successed', component:InvoiceSuccessedComponent},
=======
  //driver routes
  {path: 'driver-home-page', component:DriverHomePageComponent },
  {path: 'pickups-tasks-mainpage', component: PickupsTasksMainpageComponent },
  {path: 'delivery-tasks-mainpage', component: DeliveryTasksMainpageComponent},
  {path: 'driver-contactus-page', component: DriverContactusPageComponent},
  {path: 'order-details-pending/:id', component: PickupsPendingOrderDetailsComponent}, 
  {path: 'delivery-order-details/:id', component: DeliveryPendingOrderDetailsComponent},
  
  

   
    
  
    
>>>>>>> b0271b6d6c5d7bd609c8896f7c888e0e493386b5
];
// Define the routing module
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

