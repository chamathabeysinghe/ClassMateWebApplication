import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {ClassRoom} from "../../models/Class";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
    moduleId:module.id,
    selector: 'dashboard',
    templateUrl: `components/dashboard/dashboard.component.html`,
    providers:[ClassService]
})

export class DashboardComponent{

    classes:ClassRoom[];


    constructor(private classService:ClassService,private userService:UserService,public router:Router){

        this.classes=[];
        this.classService.getClasses().subscribe(classroooms=>{
          // console.log(classroooms);
            this.classes=classroooms;
           console.log(this.classes);
        });
    }


    removeClass(id){
        console.log("Class Removed : "+id);
        this.classService.removeClass(id).subscribe(data=>{
            console.log(data);
            if(data.n){
                for(var i=0;i<this.classes.length;i++){
                    if(this.classes[i]._id==id){
                        this.classes.splice(i,1);
                    }
                }
            }
        });
    }
    viewClass(id){
        console.log("View Class : "+id);
        this.router.navigate(['classroom',id]);
    }
}
