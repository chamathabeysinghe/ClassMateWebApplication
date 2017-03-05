"use strict";
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
// Define which component should be loaded based on the current URL
exports.routes = [
    { path: '/login', component: login_component_1.LoginComponent },
    { path: '/signup', component: login_component_1.LoginComponent },
    { path: '/dashboard', component: dashboard_component_1.DashboardComponent },
];
//# sourceMappingURL=app.routes.js.map