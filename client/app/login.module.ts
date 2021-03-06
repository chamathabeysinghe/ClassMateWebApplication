import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'
import { AppComponent }  from './app.component';
import {LoginComponent} from './components/login/login.component'
import {SignUpComponent} from "./components/signup/signup.component";
import {ClassFormComponent} from "./components/classroom-create/classform.component";

@NgModule({
    imports:      [ BrowserModule,HttpModule,FormsModule ],
    declarations: [ AppComponent,LoginComponent ],
    bootstrap:    [ AppComponent ]
})
// @NgModule({
//     imports:      [ BrowserModule,HttpModule,FormsModule ],
//     declarations: [ AppComponent,SignUpComponent ],
//     bootstrap:    [ SignUpComponent ]
// })
@NgModule({
    imports:      [ BrowserModule,HttpModule,FormsModule ],
    declarations: [ AppComponent,LoginComponent,ClassFormComponent ],
    bootstrap:    [ LoginComponent ]
})

export class LoginModule { }