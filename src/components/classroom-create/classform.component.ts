import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";


@Component({
    moduleId:module.id,
    selector: 'class-form',
    templateUrl: `components/classroom-create/classform.component.html`,
    providers:[ClassService]
})

export class ClassFormComponent{

    data={name:"",startTime:"",endTime:"",nextClassTime:"",location:"",isDiscoverable:false};
    constructor(private classService:ClassService){

    }

  /**
   * submit a class room create form
   */
  formSubmit(){
        console.log(this.data);
        var classroom={
            name:this.data.name,
            startTime:this.data.startTime,
            endTime:this.data.endTime,
            location:this.data.location,
            isDiscoverable:this.data.isDiscoverable
        };
        this.classService.createClass(classroom).subscribe(data=>{
            if(data.success){
                console.log("Class Created");
            }
            else{
                console.log(data.msg);
            }
        });

    }

}
