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
var DasboardComponent = (function () {
    function DasboardComponent(classService) {
        this.classService = classService;
        var newClass = new Class_1.ClassRoom();
        this.classes.push(newClass);
    }
    return DasboardComponent;
}());
DasboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        templateUrl: "dashboard.component.html",
        providers: [class_service_1.ClassService]
    }),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], DasboardComponent);
exports.DasboardComponent = DasboardComponent;
//# sourceMappingURL=dashboard.component.js.map