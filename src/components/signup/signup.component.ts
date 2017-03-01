import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";

@Component({
  moduleId:module.id,
  selector: 'sign-up',
  templateUrl: `components/signup/signup.component.html`,
  providers:[UserService]
})

export class SignUpComponent{

  data={email:"",password:"",firstName:"",lastName:"",accountType:""};
  constructor(private userService:UserService){

  }
  formSubmit(){

    console.log(this.data);
    var user={
      firstName:this.data.firstName,
      lastName:this.data.lastName,
      accountType:this.data.accountType,
      email:this.data.email,
      password:this.data.password
    };

    if(this.userService.signUp(user).subscribe()){
      console.log("Successfully Signed up");
    }

  }

}
