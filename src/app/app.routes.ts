import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { SignupComponent } from './components/customer/signup/signup.component';
import { WhoAreYouComponent } from './components/customer/whoareyou/whoareyou.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



//driver routes
import { DriverHomePageComponent } from './pages/Driver/driver-home-page/driver-home-page.component';
import { PickupsTasksMainpageComponent } from './pages/Driver/pickups-tasks-mainpage/pickups-tasks-mainpage.component';
import { PickupsPendingOrderDetailsComponent } from './pages/Driver/pickups-pending-order-details/pickups-pending-order-details.component';
import { DeliveryTasksMainpageComponent } from './pages/Driver/delivery-tasks-mainpage/delivery-tasks-mainpage.component';
import { DeliveryPendingOrderDetailsComponent } from './pages/Driver/delivery-pending-order-details/delivery-pending-order-details.component';
import { DriverContactusPageComponent } from './pages/Driver/driver-contactus-page/driver-contactus-page.component';


import { LaundryHomeComponent } from './components/customer/laundry-home/laundry-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CusHomeComponent } from './components/customer/cus-home/cus-home.component';
import { LaundrySignupComponent } from './components/customer/laundry-signup/laundry-signup.component';
import { HowItWorksComponent } from './components/customer/how-it-works/how-it-works.component';



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
  { path: 'laundry-home', component: LaundryHomeComponent }, 

   // Route for admin home page
  { path: 'admin-home', component: AdminHomeComponent },
  
  // Route for laundry-specific signup
  {path: 'laundry-signup', component:LaundrySignupComponent},

 // Route for how-it-works
   {path: 'how-it-works', component:HowItWorksComponent},


  //driver routes
  {path: 'driver-home-page', component:DriverHomePageComponent },
  {path: 'pickups-tasks-mainpage', component: PickupsTasksMainpageComponent },
  {path: 'delivery-tasks-mainpage', component: DeliveryTasksMainpageComponent},
  {path: 'driver-contactus-page', component: DriverContactusPageComponent},
  {path: 'order-details-pending/:id', component: PickupsPendingOrderDetailsComponent}, 
  {path: 'delivery-order-details/:id', component: DeliveryPendingOrderDetailsComponent},
  
  

   
    
  
    
];
// Define the routing module
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

