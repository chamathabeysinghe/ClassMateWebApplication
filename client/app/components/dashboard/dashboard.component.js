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
var DashboardComponent = (function () {
    function DashboardComponent(classService) {
        var _this = this;
        this.classService = classService;
        this.classes = [];
        this.classService.getClasses().subscribe(function (classroooms) {
            _this.classes = classroooms;
            console.log(_this.classes);
        });
    }
    DashboardComponent.prototype.removeClass = function (id) {
        var _this = this;
        console.log("Class Removed : " + id);
        this.classService.removeClass(id).subscribe(function (data) {
            console.log(data);
            if (data.n) {
                for (var i = 0; i < _this.classes.length; i++) {
                    if (_this.classes[i]._id == id) {
                        _this.classes.splice(i, 1);
                    }
                }
            }
        });
    };
    DashboardComponent.prototype.viewClass = function (id) {
        console.log("View Class : " + id);
        window.location.href = "/class-room?id=" + id;
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