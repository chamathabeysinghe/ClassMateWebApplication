import {Component} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {ClassRoom} from "../../models/Class";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: `components/dashboard/dashboard.component.html`,
  providers: [ClassService]
})

export class DashboardComponent {

  classes: ClassRoom[];
  data = {name: "", startTime: "", endTime: "", nextClassTime: "", location: "", isDiscoverable: false};

  constructor(private classService: ClassService, private userService: UserService, public router: Router) {

    this.classes = [];
    this.updateDashboard();
  }

  /**
   * update the dashboard with new classes
   */
  updateDashboard() {
    this.classService.getClasses().subscribe(classroooms=> {
      // console.log(classroooms);
      this.classes = classroooms;
      console.log(this.classes);
    });
  }

  /**
   * remove a class
   * @param id of the class
   */
  removeClass(id) {
    console.log("Class Removed : " + id);
    this.classService.removeClass(id).subscribe(data=> {
      console.log(data);
      if (data.n) {
        for (var i = 0; i < this.classes.length; i++) {
          if (this.classes[i]._id == id) {
            this.classes.splice(i, 1);
          }
        }
      }
    });
  }

  /**
   * route to selected class
   * @param id
   */
  viewClass(id) {
    this.router.navigate(['classroom', id]);
  }

  /**
   * creating a new class
   */
  formSubmit() {
    console.log(this.data);
    var classroom = {
      name: this.data.name,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      location: this.data.location,
      isDiscoverable: this.data.isDiscoverable
    };
    this.classService.createClass(classroom).subscribe(data=> {
      if (data.success) {
        console.log("Class Created");
        this.updateDashboard();
        jQuery("#create-class-teacher-modal").modal("hide");

      }
      else {
        console.log(data.msg);
      }
    });

  }
}
