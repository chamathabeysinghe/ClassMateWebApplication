import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {contentHeaders} from "../common/headers";

@Injectable()
export class UserService{

    baseUrl="http://localhost:3000/api";
    userType="student";
    constructor(private http:Http){
        console.log('Task service initialized...');
    }

    login(username, password,func) {
      event.preventDefault();
      let body = JSON.stringify({ email:username, password:password });
      this.http.post(this.baseUrl+'/authenticate', body, { headers: contentHeaders }).map(res=>res.json()).subscribe(
        response=>{
          if(response.success==true){
            localStorage.removeItem('id_token');
            localStorage.setItem('id_token', response.token);
            func(true);
            // window.location.href="/dashboard";
          }
          else{
            console.log("error in authentication");
            func(false);
          }
        },
        error => {
          console.log(error.text());
          func(false);
        }
      );
      // return false;
      // return this.http.post(this.baseUrl+'/authenticate', body, { headers: contentHeaders }).map(res=>res.json());

    }
    testCall(){
      console.log("TEST CALL*******************88");
      let Theaders=contentHeaders;
      Theaders.append("Authorization","JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGIxOTVlYjJhNGRiMWI4MjQ2YWYzZjMiLCJmaXJzdE5hbWUiOiJVbWFuaSIsImxhc3ROYW1lIjoiV2VsaXNhcmEiLCJhY2NvdW50VHlwZSI6InRlYWNoZXIiLCJlbWFpbCI6InV0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEpPem96RkQ2RlZ6MUVnanE4ZDRhT2VJWXIxMWd6YUdUUTc2dHVra1hocmFRRkkwNHRHU0QyIiwiX192IjowLCJlbnJvbGxtZW50cyI6W10sImNsYXNzcm9vbXMiOltdLCJmZWVkYmFja3MiOltdLCJxdWVzdGlvbnMiOltdfQ.mJrBBQdwOSajUoEMs9-O1-FJFJyA7pXdWbbYLuYQXow");
      this.http.get("http://localhost:3000/api/memberinfo",{headers:Theaders}).subscribe(data=>{
        console.log(data);
      });
    }
    signUp(user){
        var headers=new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.baseUrl+'/sign-up',JSON.stringify(user),{headers:headers}).map(res=>res.json());

    }
}
