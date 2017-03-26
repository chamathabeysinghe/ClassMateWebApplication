import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {authenticatedContentHeaders} from "../../common/authenticated.headers";

@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl: `components/login/login.component.html`,

})

export class LoginComponent{

  data={email:"",password:""}; //for user login information
  constructor(private userService:UserService,public router:Router){

  }

  /**
   * login form handling
   */
  formSubmit(){
    var myself=this;
    this.userService.login(this.data.email,this.data.password,function (result) {
      console.log("Result is  "+result);
      if(result){
        myself.navigate();
      }
      else {
        console.log("Error in authentication");
      }
    });
  }

  /**
   * function to navigate dashboard
   */
  navigate(){
    this.router.navigate(['dashboard']);
  }

  clickRegister(){
    this.router.navigate(['signup']);
  }
}
