import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';
import {SignupModule} from "./signup.module";
import {ClassFormModule} from "./classform.module";

platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModule(SignupModule);
platformBrowserDynamic().bootstrapModule(ClassFormModule);

