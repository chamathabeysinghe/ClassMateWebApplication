import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector: 'sign-up',
  templateUrl: `components/signup/signup.component.html`,
  providers:[UserService]
})

export class SignUpComponent{

  data={email:"",password:"",firstName:"",lastName:"",accountType:""};
  errorOccurred=false;
  constructor(private userService:UserService,public router:Router){

  }

  /**
   * post user details for registration
   */
  formSubmit(){
    console.log(this.data);
    var user={
      firstName:this.data.firstName,
      lastName:this.data.lastName,
      accountType:this.data.accountType,
      email:this.data.email,
      password:this.data.password
    };

    this.userService.signUp(user).subscribe(data=>{
      if(data.success){
        this.errorOccurred=false;
        console.log(data);
        this.router.navigate(['login']);
      }
      else{
        this.errorOccurred=true;
        console.log("Error occurred in saving user");
      }

    });

  }

}
