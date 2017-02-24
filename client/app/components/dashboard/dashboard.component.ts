import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {ClassRoom} from "../../models/Class";


@Component({
    moduleId:module.id,
    selector: 'dashboard',
    templateUrl: `dashboard.component.html`,
    providers:[ClassService]
})

export class DashboardComponent{

    classes:ClassRoom[];

    constructor(private classService:ClassService){

        this.classes=[];
        this.addClassRoom();
    }

    addClassRoom(){
        var newClass=new ClassRoom();
        newClass.name="NEw Name";
        newClass.startTime="Start Time";


        this.classes.push(newClass);
        console.log(newClass);
        console.log(this.classes);
    }

    removeClass(id){

        console.log("Class Removed : "+id);
    }
    viewClass(id){
        console.log("View Class : "+id);
    }


}