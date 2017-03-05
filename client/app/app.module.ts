import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'
import { AppComponent }  from './app.component';
import {LoginComponent} from './components/login/login.component'
import {ClassFormComponent} from "./components/classroom-create/classform.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

@NgModule({
    imports:      [ BrowserModule,HttpModule,FormsModule, RouterModule.forRoot(routes, {useHash: true}) ],
    declarations: [ AppComponent,LoginComponent,DashboardComponent,ClassFormComponent ],
    bootstrap:    [ AppComponent ]
})


export class AppModule { }