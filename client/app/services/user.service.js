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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        console.log('Task service initialized...');
    }
    // getTasks(){
    //     return this.http.get('http://localhost:3000/api/tasks').map(res=>res.json());
    // }
    //
    // addTask(newTask){
    //     var headers=new Headers();
    //     headers.append('Content-Type','application/json');
    //     return this.http.post('http://localhost:3000/api/task',JSON.stringify(newTask),{headers:headers})
    //         .map(res=>res.json());
    // }
    //
    // deleteTask(id){
    //     return this.http.delete('http://localhost:3000/api/tasks/'+id)
    //         .map(res=>res.json());
    // }
    //
    // updateStatus(task){
    //     var headers=new Headers();
    //     headers.append('Content-Type','application/json');
    //     return this.http.put('http://localhost:3000/api/tasks/'+task._id,JSON.stringify(task),{headers:headers})
    //         .map(res=>res.json());
    // }
    UserService.prototype.login = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/login', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.signUp = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/signup', JSON.stringify(user), { headers: headers }).map(function (res) { return res.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map