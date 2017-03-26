import { Component } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
})
export class AppComponent {
  title = 'app works!';
}
