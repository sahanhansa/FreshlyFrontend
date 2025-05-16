import { Routes } from '@angular/router';
import { LoginComponent } from './components/customer/login/login.component';
import { SignupComponent } from './components/customer/signup/signup.component';
import { WhoAreYouComponent } from './components/customer/whoareyou/whoareyou.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
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

   
    
  
    
];
// Define the routing module
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

