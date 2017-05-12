import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector: 'nav-bar',
  templateUrl: `components/nav-bar/nav-bar.component.html`,
  providers:[UserService]
})

export class NavbarComponent{
  isStudent=false;
  constructor(private userService:UserService,public router:Router){
    this.isStudent=(userService.getAccountType()=='student');
  }

  findClasses(){
    this.router.navigate(['find-class']);
  }
  gotoDashboard(){
    this.router.navigate(['dashboard']);
  }
  upgradePage(){

  }
}
