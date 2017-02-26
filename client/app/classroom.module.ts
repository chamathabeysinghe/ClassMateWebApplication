import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'
import { AppComponent }  from './app.component';
import {ClassRoomComponent} from "./components/classroom/classroom.component";

@NgModule({
    imports:      [ BrowserModule,HttpModule,FormsModule ],
    declarations: [ AppComponent,ClassRoomComponent ],
    bootstrap:    [ ClassRoomComponent ]
})

export class ClassRoomModule { }