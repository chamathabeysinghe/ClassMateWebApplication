import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app.component';
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../common/auth.guard";
import {LoginComponent} from "../components/login/login.component";
import {SignUpComponent} from "../components/signup/signup.component";
import {ClassFormComponent} from "../components/classroom-create/classform.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {ClassRoomComponent} from "../components/classroom/classroom.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ClassFormComponent,
    DashboardComponent,
    ClassRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [AuthGuard, ...AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
