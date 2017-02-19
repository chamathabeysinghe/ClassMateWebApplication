import { Component } from '@angular/core';


@Component({
    moduleId:module.id,
    selector: 'class-form',
    templateUrl: `classform.component.html`,
})

export class ClassFormComponent{

    data={name:"",time:"",nextClassTime:"",location:"",duration:"",isDiscoverable:false};
    constructor(){

    }
    formSubmit(){
        console.log(this.data);
        var user={

        };

        // if(this.userService.signUp(user).subscribe()){
        //     console.log("Successfully Signed up");
        // }

    }

}