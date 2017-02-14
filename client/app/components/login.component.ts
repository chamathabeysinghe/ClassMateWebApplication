import { Component } from '@angular/core';
import {User} from '../models/User';

@Component({
    moduleId:module.id,
    selector: 'login',
    templateUrl: `login.component.html`
})

export class LoginComponent{
    email:string;
    password:string;

    constructor(){

    }

    postLogin(){
        console.log("Form submitting")
    }
}