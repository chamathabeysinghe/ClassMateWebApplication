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
var class_service_1 = require("../../services/class.service");
var Class_1 = require("../../models/Class");
var DashboardComponent = (function () {
    function DashboardComponent(classService) {
        this.classService = classService;
        this.classes = [];
        this.addClassRoom();
    }
    DashboardComponent.prototype.addClassRoom = function () {
        var newClass = new Class_1.ClassRoom();
        newClass.name = "NEw Name";
        newClass.startTime = "Start Time";
        this.classes.push(newClass);
        console.log(newClass);
        console.log(this.classes);
    };
    DashboardComponent.prototype.removeClass = function (id) {
        console.log("Class Removed : " + id);
    };
    DashboardComponent.prototype.viewClass = function (id) {
        console.log("View Class : " + id);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        templateUrl: "dashboard.component.html",
        providers: [class_service_1.ClassService]
    }),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map