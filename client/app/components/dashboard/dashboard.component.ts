import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {ClassRoom} from "../../models/Class";


@Component({
    moduleId:module.id,
    selector: 'dashboard',
    templateUrl: `dashboard.component.html`,
    providers:[ClassService]
})

export class DasboardComponent{

    classes:ClassRoom[];

    constructor(private classService:ClassService){
        var newClass=new ClassRoom();

        this.classes.push(newClass);

    }


}