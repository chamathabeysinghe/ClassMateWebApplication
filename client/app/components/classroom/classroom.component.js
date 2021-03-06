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
var router_1 = require("@angular/router");
var ClassRoomComponent = (function () {
    function ClassRoomComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    ClassRoomComponent.prototype.ngOnInit = function () {
        // subscribe to router event
        var id = this.route.params
            .switchMap(function (params) {
            console.log(params['id']);
        });
        // this.activatedRoute.params.subscribe((params: Params) => {
        //     let userId = params['id'];
        //     console.log(userId);
        // });
    };
    return ClassRoomComponent;
}());
ClassRoomComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'classroom',
        templateUrl: "classroom.component.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
], ClassRoomComponent);
exports.ClassRoomComponent = ClassRoomComponent;
//# sourceMappingURL=classroom.component.js.map