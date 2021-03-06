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
var user_service_1 = require("../../services/user.service");
var SignUpComponent = (function () {
    function SignUpComponent(userService) {
        this.userService = userService;
        this.data = { email: "", password: "", firstName: "", lastName: "", accountType: "" };
    }
    SignUpComponent.prototype.formSubmit = function () {
        console.log(this.data);
        var user = {
            firstName: this.data.firstName,
            lastName: this.data.lastName,
            accountType: this.data.accountType,
            email: this.data.email,
            password: this.data.password
        };
        if (this.userService.signUp(user).subscribe()) {
            console.log("Successfully Signed up");
        }
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sign-up',
        templateUrl: "signup.component.html",
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map