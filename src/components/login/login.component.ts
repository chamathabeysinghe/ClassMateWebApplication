import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl: `components/login/login.component.html`,
  providers:[UserService]
})

export class LoginComponent{

  data={email:"",password:""};
  constructor(private userService:UserService,public router:Router){

  }
  formSubmit(){
    // this.router.navigateByUrl('/dashboard');
    // console.log(this.data);
    // var user={
    //   email:this.data.email,
    //   password:this.data.password
    // };
    // this.userService.login(this.data.email,this.data.password);
    this.userService.login(this.data.email,this.data.password).subscribe(
      response=>{
        if(response.success==true){
          localStorage.setItem('id_token', response.token);
          console.log(response);
          //this.router.navigate(['signup']);
          // window.location.href="/dashboard";
        }
        else{
          console.log("error in authentication");
        }
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );


  }

}
