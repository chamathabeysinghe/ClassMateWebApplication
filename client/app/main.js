"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
var signup_module_1 = require("./signup.module");
var classform_module_1 = require("./classform.module");
var dashboard_module_1 = require("./dashboard.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(signup_module_1.SignupModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(classform_module_1.ClassFormModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(dashboard_module_1.DashboardModule);
//# sourceMappingURL=main.js.map