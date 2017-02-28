import {Component, OnDestroy, OnInit} from '@angular/core';

import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    moduleId:module.id,
    selector: 'classroom',
    templateUrl: `classroom.component.html`
})

export class ClassRoomComponent implements OnInit{


    constructor(private route: ActivatedRoute, private router: Router){

    }

    ngOnInit() {
        // subscribe to router event

        var id = this.route.params
            .switchMap((params: Params) => {
                console.log(params['id']);
            });


        // this.activatedRoute.params.subscribe((params: Params) => {
        //     let userId = params['id'];
        //     console.log(userId);
        // });
    }


}