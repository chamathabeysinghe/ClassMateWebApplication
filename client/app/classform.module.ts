import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'
import { AppComponent }  from './app.component';
import {ClassFormComponent} from "./components/classroom-create/classform.component";

@NgModule({
    imports:      [ BrowserModule,HttpModule,FormsModule ],
    declarations: [ AppComponent,ClassFormComponent ],
    bootstrap:    [ ClassFormComponent ]
})

export class ClassFormModule { }