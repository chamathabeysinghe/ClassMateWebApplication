import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
// import {TaskService} from './services/task.service';

@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: `app.component.html`,
    providers:[UserService]
})
export class AppComponent { name = 'Angular'; }