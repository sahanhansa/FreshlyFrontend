import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent}
];

