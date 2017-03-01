import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {ClassRoom} from "../../models/Class";


@Component({
  moduleId:module.id,
  selector: 'classroom',
  templateUrl: `components/classroom/classroom.component.html`,
  providers:[ClassService]
})

export class ClassRoomComponent{


  constructor(private classService:ClassService){


  }



}
