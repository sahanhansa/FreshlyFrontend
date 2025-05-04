import { Routes } from '@angular/router';

import { LoginComponent } from './components/login-customer/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WhoAreYouComponent } from './components/whoareyou/whoareyou.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
// import { RegularOrdersComponent } from './pages/Laundry/regular-orders/regular-orders.component';
// import { HomeComponent } from './pages/Laundry/home/home.component';
// import { ExpressOrderComponent } from './pages/Laundry/express-order/express-order.component';
// import { OrdersComponent } from './pages/Laundry/orders/orders.component';
// import { InvoiceSuccessedComponent } from './pages/Laundry/invoice-successed/invoice-successed.component';
// import { ConfirmOrdersComponent } from './pages/Laundry/confirm-orders/confirm-orders.component';

export const routes: Routes = [
    { path: '', component: WhoAreYouComponent }, 
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    // {path:'laundrysign', component: laut},
    
];

// export const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//     { path: 'home', component: HomeComponent },
//     { path: 'regular-order', component: RegularOrdersComponent },
//     { path: 'express-order', component:ExpressOrderComponent},
//     { path: 'orders', component: OrdersComponent },
//     {path:'invoice-successed' , component:InvoiceSuccessedComponent },
//     {path: 'confirm-orders', component: ConfirmOrdersComponent}
   
// ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

