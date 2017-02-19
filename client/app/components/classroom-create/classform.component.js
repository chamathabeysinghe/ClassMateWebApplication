"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ClassFormComponent = (function () {
    function ClassFormComponent() {
        this.data = { name: "", startTime: "", endTime: "", nextClassTime: "", location: "", isDiscoverable: false };
    }
    ClassFormComponent.prototype.formSubmit = function () {
        console.log(this.data);
        var ;
        var default_1 = (function () {
            function default_1() {
            }
            return default_1;
        }());
        {
            name: this.data.name,
                startTime;
            this.data.startTime,
                endTime;
            this.data.endTime,
                location;
            this.data.location,
                isDiscoverable;
            this.data.isDiscoverable;
        }
        ;
        // if(this.userService.signUp(user).subscribe()){
        //     console.log("Successfully Signed up");
        // }
    };
    return ClassFormComponent;
}());
ClassFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'class-form',
        templateUrl: "classform.component.html",
    }),
    __metadata("design:paramtypes", [])
], ClassFormComponent);
exports.ClassFormComponent = ClassFormComponent;
//# sourceMappingURL=classform.component.js.map