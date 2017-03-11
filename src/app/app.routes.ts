import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {AuthGuard} from "../common/auth.guard";
import {ClassRoomComponent} from "../components/classroom/classroom.component";
import {StudentClassroomComponent} from "../components/student-classroom/student-classroom.component";


export const routes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  { path: 'dashboard',   component: DashboardComponent, canActivate: [AuthGuard] },
  {path:  'classroom/:id', component:ClassRoomComponent,canActivate: [AuthGuard]},
  {path:'student-classroom',component:StudentClassroomComponent,canActivate:[AuthGuard]},
  { path: '**',     component: LoginComponent },
];
