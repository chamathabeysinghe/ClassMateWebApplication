import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';


export const routes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  // { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: '**',     component: LoginComponent },
];
