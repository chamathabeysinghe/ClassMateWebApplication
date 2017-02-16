import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";

@Component({
    moduleId:module.id,
    selector: 'sign-up',
    templateUrl: `signup.component.html`,
    providers:[UserService]
})

export class SignUpComponent{

    data={email:"",password:"",firstName:"",lastName:"",accountType:""};
    constructor(private userService:UserService){

    }
    formSubmit(){
        console.log(this.data);
    }

}