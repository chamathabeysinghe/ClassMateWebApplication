import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {AuthGuard} from "../common/auth.guard";
import {ClassRoomComponent} from "../components/classroom/classroom.component";
import {FindClassComponent} from "../components/find-class/find-class.component";


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'find-class',component:FindClassComponent,canActivate:[AuthGuard]},
  { path: 'classroom/:id', component:ClassRoomComponent,canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent },

];
