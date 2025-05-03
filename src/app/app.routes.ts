import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RegularOrdersComponent } from './pages/Laundry/regular-orders/regular-orders.component';
import { HomeComponent } from './pages/Laundry/home/home.component';
import { ExpressOrderComponent } from './pages/Laundry/express-order/express-order.component';
import { OrdersComponent } from './pages/Laundry/orders/orders.component';
import { InvoiceSuccessedComponent } from './pages/Laundry/invoice-successed/invoice-successed.component';
import { ConfirmOrdersComponent } from './pages/Laundry/confirm-orders/confirm-orders.component';


//driver routes

import { PickupsTasksMainpageComponent } from './pages/Driver/pickups-tasks-mainpage/pickups-tasks-mainpage.component';
import { PickupsPendingOrderDetailsComponent } from './pages/Driver/pickups-pending-order-details/pickups-pending-order-details.component';
import { DeliveryTasksMainpageComponent } from './pages/Driver/delivery-tasks-mainpage/delivery-tasks-mainpage.component';
import { DeliveryPendingOrderDetailsComponent } from './pages/Driver/delivery-pending-order-details/delivery-pending-order-details.component';
import { DriverContactusPageComponent } from './pages/Driver/driver-contactus-page/driver-contactus-page.component';


export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  //   { path: 'home', component: HomeComponent },
  //   { path: 'regular-order', component: RegularOrdersComponent },
  //   { path: 'express-order', component:ExpressOrderComponent},
  //   { path: 'orders', component: OrdersComponent },
  //   {path:'invoice-successed' , component:InvoiceSuccessedComponent },
  //   {path: 'confirm-orders', component: ConfirmOrdersComponent},

    //driver routes
      {path: '', component: PickupsTasksMainpageComponent},
      {path: 'pickups-pending-order-details', component: PickupsPendingOrderDetailsComponent},
      {path: 'delivery-tasks-mainpage', component: DeliveryTasksMainpageComponent},
      {path: 'delivery-pending-order-details', component: DeliveryPendingOrderDetailsComponent},
      {path: 'driver-contactus-page', component: DriverContactusPageComponent},


   
];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
