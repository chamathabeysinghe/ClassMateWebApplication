import { Component } from '@angular/core';
import {User} from '../models/User';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
// import {Router} from '@angular/router';

@Component({
    moduleId:module.id,
    selector: 'login',
    templateUrl: `login.component.html`,
    providers:[UserService]
})

export class LoginComponent{

    data={email:"",password:""};
    constructor(private userService:UserService){

    }
    formSubmit(){
        // this.router.navigateByUrl('/dashboard');
        console.log(this.data);
        var user={
            email:this.data.email,
            password:this.data.password
        };
        if(this.userService.login(user).subscribe()){
            window.location.href="/dashboard";
        }

    }
    postLogin(){

    }
}