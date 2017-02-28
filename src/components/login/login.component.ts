import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";

@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl: `components/login/login.component.html`,
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
    this.userService.login(user).subscribe(data=>{
      if(data.success==true){
        window.location.href="/dashboard";
      }
      else{
        console.log("error in authentication");
      }
    });


  }

}
