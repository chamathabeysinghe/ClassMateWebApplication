import { Component } from '@angular/core';


@Component({
    moduleId:module.id,
    selector: 'class-form',
    templateUrl: `classform.component.html`,
})

export class ClassFormComponent{

    data={name:"",startTime:"",endTime:"",nextClassTime:"",location:"",isDiscoverable:false};
    constructor(){

    }
    formSubmit(){
        console.log(this.data);
        var class={
            name:this.data.name,
            startTime:this.data.startTime,
            endTime:this.data.endTime,
            location:this.data.location,
            isDiscoverable:this.data.isDiscoverable
        };

        // if(this.userService.signUp(user).subscribe()){
        //     console.log("Successfully Signed up");
        // }

    }

}