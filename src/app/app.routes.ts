import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { SignupComponent } from './components/customer/signup/signup.component';
import { WhoAreYouComponent } from './components/customer/whoareyou/whoareyou.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HomeComponent } from './pages/Laundry/home/home.component';
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


  // Route for new orders page
  {path: 'new-orders', component:NewOrdersComponent},

 // Route for confirm orders page
  {path: 'confirm-orders', component:ConfirmOrdersComponent},

  // Route for invoice success page
   {path: 'invoice-successed', component:InvoiceSuccessedComponent},
];
// Define the routing module
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

