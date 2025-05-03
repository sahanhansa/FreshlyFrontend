import { Routes } from '@angular/router';
import { LoginComponent } from './component/login-customer/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { WhoAreYouComponent } from './component/whoareyou/whoareyou.component';


export const routes: Routes = [
    { path: '', component: WhoAreYouComponent }, 
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'laundrysign', component: laut},
    
];

