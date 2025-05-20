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
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CusHomeComponent } from './components/customer/cus-home/cus-home.component';
import { LaundrySignupComponent } from './components/customer/laundry-signup/laundry-signup.component';
import { HowItWorksComponent } from './components/customer/how-it-works/how-it-works.component';
import { NewOrdersComponent } from './pages/Laundry/new-orders/new-orders.component';
import { ConfirmOrdersComponent } from './pages/Laundry/confirm-orders/confirm-orders.component';
import { InvoiceSuccessedComponent } from './pages/Laundry/invoice-successed/invoice-successed.component';
import { LaundryFeedbacksComponent } from './pages/Laundry/laundry-feedbacks/laundry-feedbacks.component';
import { LaundryItemsComponent } from './pages/Laundry/laundry-items/laundry-items.component';
import { LaundryOrdersComponent } from './pages/Laundry/laundry-orders/laundry-orders.component';
import { LaundryProfileComponent } from './pages/Laundry/laundry-profile/laundry-profile.component';
import { LaundrySummaryComponent } from './pages/Laundry/laundry-summary/laundry-summary.component';



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

  // Route for new orders page
  {path: 'new-orders', component:NewOrdersComponent},

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


