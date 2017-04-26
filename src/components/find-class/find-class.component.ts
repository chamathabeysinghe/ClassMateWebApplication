import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {Router} from "@angular/router";
import {authenticatedContentHeaders} from "../../common/authenticated.headers";

@Component({
  moduleId:module.id,
  selector: 'find-class',
  templateUrl: `components/find-class/find-class.component.html`,
  providers: [ClassService]

})

export class FindClassComponent{

  results=[1,2,3,4,5];
  keyword:string;
  constructor(private classService:ClassService,public router:Router){
  }

  keywordChange(){
    console.log("Keyword Changed");
  }

}
