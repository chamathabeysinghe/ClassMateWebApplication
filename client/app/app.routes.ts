import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

// Define which component should be loaded based on the current URL
export const routes: Routes = [
    { path: '/login',  component: LoginComponent },
    { path: '/signup', component: LoginComponent },
    { path: '/dashboard',     component: DashboardComponent },
];



