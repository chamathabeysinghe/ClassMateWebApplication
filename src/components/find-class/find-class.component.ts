import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {Router} from "@angular/router";
import {authenticatedContentHeaders} from "../../common/authenticated.headers";
import {ClassRoom} from "../../models/Class";

@Component({
  moduleId:module.id,
  selector: 'find-class',
  templateUrl: `components/find-class/find-class.component.html`,
  providers: [ClassService]

})

export class FindClassComponent{

  results=[1,2,3,4,5];
  classes: ClassRoom[];
  keyword:string;
  constructor(private classService:ClassService,public router:Router){
    this.keyword="";
  }


  keywordChange(){
    console.log(this.keyword);
    this.updateResults();
  }


  updateResults() {
    this.classService.searchClasses(this.keyword).subscribe(classroooms=> {
      // console.log(classroooms);
      this.classes = classroooms;
      console.log(this.classes);
    });
  }


  enrollStudent(classId){
    console.log(classId);
    this.classService.enrollStudent(classId).subscribe(data=> {
      console.log(data.success);
    });
  }


}
