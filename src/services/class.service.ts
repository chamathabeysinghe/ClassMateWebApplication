import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {contentHeaders} from "../common/headers";
import {authenticatedContentHeaders} from "../common/authenticated.headers";

@Injectable()
export class ClassService {
  baseUrl = "http://localhost:3000";

  constructor(private http: Http) {
    console.log('Class service initialized...');
  }

  createClass(classroom) {
    let headers = authenticatedContentHeaders;
    return this.http.post(this.baseUrl + '/api/create-class', JSON.stringify(classroom), {headers: headers}).map(res=>res.json());
  }

  createLecture(lecture){
    let header=authenticatedContentHeaders;
    return this.http.post(this.baseUrl+'/api/create-lecture',JSON.stringify(lecture),{headers:header}).map(res=>res.json());
  }


  testCall() {
    console.log("TEST CALL*******************88");
    let Theaders = contentHeaders;
    Theaders.append("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGIxOTVlYjJhNGRiMWI4MjQ2YWYzZjMiLCJmaXJzdE5hbWUiOiJVbWFuaSIsImxhc3ROYW1lIjoiV2VsaXNhcmEiLCJhY2NvdW50VHlwZSI6InRlYWNoZXIiLCJlbWFpbCI6InV0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEpPem96RkQ2RlZ6MUVnanE4ZDRhT2VJWXIxMWd6YUdUUTc2dHVra1hocmFRRkkwNHRHU0QyIiwiX192IjowLCJlbnJvbGxtZW50cyI6W10sImNsYXNzcm9vbXMiOltdLCJmZWVkYmFja3MiOltdLCJxdWVzdGlvbnMiOltdfQ.mJrBBQdwOSajUoEMs9-O1-FJFJyA7pXdWbbYLuYQXow");
    this.http.get("http://localhost:3000/api/memberinfo", {headers: Theaders}).subscribe(data=> {
      console.log(data);
    });
  }

  getClasses() {
    let headers = authenticatedContentHeaders;
    console.log("Came to this point");
    return this.http.get(this.baseUrl + '/api/get-class', {headers: headers}).map(res=>res.json());
  }

  removeClass(id) {
    let headers = authenticatedContentHeaders;
    return this.http.delete(this.baseUrl + '/api/remove-class/' + id,{headers:headers}).map(res=>res.json());
  }

  GetData(id){
    let headers = authenticatedContentHeaders;
    console.log("********************************");
    console.log(id);
    return this.http.get(this.baseUrl + '/api/get-class', {headers: headers}).map(res=>res.json());
  }
}
