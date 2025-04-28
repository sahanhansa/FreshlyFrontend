import { Routes } from '@angular/router';

import { PickupsTasksMainpageComponent } from './Pages/pickups-tasks-mainpage/pickups-tasks-mainpage.component';
import { DeliveryTaskMainpageComponent } from './Pages/delivery-task-mainpage/delivery-task-mainpage.component';
import { ContactusMainpageComponent } from './Pages/contactus-mainpage/contactus-mainpage.component';
import { PickupsPendingOrderDetailsComponent } from './Pages/pickups-pending-order-details/pickups-pending-order-details.component';
import { PickupsCompleteOrderDetailsPageComponent } from './Pages/pickups-complete-order-details-page/pickups-complete-order-details-page.component';
import { EditOrderPageComponent } from './Pages/edit-order-page/edit-order-page.component';




export const routes: Routes = [
    {path: '', component: PickupsTasksMainpageComponent},
    {path: 'delivery-task-mainpage', component: DeliveryTaskMainpageComponent},
    {path: 'contactus-mainpage', component: ContactusMainpageComponent },
    {path: 'pickups-pending-order-details', component: PickupsPendingOrderDetailsComponent },
    {path: 'edit-order-page', component: EditOrderPageComponent },
    {path: 'pickups-complete-order-details-page', component: PickupsCompleteOrderDetailsPageComponent },
    

];

export class AppRoutingModule { }