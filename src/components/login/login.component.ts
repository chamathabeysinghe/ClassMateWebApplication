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

  data={email:"",password:""};
  constructor(private userService:UserService,public router:Router){

  }
  formSubmit(){
    // this.userService.login(this.data.email,this.data.password).subscribe(
    //   response=>{
    //     if(response.success==true){
    //       localStorage.removeItem('id_token');
    //       localStorage.setItem('id_token', response.token);
    //
    //       console.log(response);
    //       this.router.navigate(['dashboard']);
    //       // window.location.href="/dashboard";
    //     }
    //     else{
    //       console.log("error in authentication");
    //     }
    //   },
    //   error => {
    //     console.log(error.text());
    //   }
    // );

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

  navigate(){
    this.router.navigate(['dashboard']);
  }

}
