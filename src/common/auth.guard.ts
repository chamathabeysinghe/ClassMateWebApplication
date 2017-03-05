import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {contentHeaders} from "./headers";
import {Http} from "@angular/http";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private http:Http) {}

  canActivate() {
    console.log("Token is checked now");
    console.log(localStorage.getItem('id_token',));
   // let status=this.authenticate();
    if(localStorage.getItem('id_token')!=null){
      return true;
    }
    else{
      return false;
    }
    // if (tokenNotExpired()) {
    //   return true;
    // }
    //
    // this.router.navigate(['/login']);
    // return false;
  }


  authenticate=function(){
    console.log("TEST CALL*******************88");
    let header=contentHeaders;
    header.append("Authorization","JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGIxOTVlYjJhNGRiMWI4MjQ2YWYzZjMiLCJmaXJzdE5hbWUiOiJVbWFuaSIsImxhc3ROYW1lIjoiV2VsaXNhcmEiLCJhY2NvdW50VHlwZSI6InRlYWNoZXIiLCJlbWFpbCI6InV0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEpPem96RkQ2RlZ6MUVnanE4ZDRhT2VJWXIxMWd6YUdUUTc2dHVra1hocmFRRkkwNHRHU0QyIiwiX192IjowLCJlbnJvbGxtZW50cyI6W10sImNsYXNzcm9vbXMiOltdLCJmZWVkYmFja3MiOltdLCJxdWVzdGlvbnMiOltdfQ.mJrBBQdwOSajUoEMs9-O1-FJFJyA7pXdWbbYLuYQXow");
    this.http.get("http://localhost:3000/api/memberinfo",{headers:header}).subscribe(data=>{
      console.log(data);
      if(data.success){
        return true;
      }
      else{
        return false;
      }
    });
  }
}
