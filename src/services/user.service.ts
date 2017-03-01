import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {contentHeaders} from "../common/headers";

@Injectable()
export class UserService{

    constructor(private http:Http){
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


    // login(user){
    //     var headers=new Headers();
    //     headers.append('Content-Type','application/json');
    //     return this.http.post('http://localhost:3000/login',JSON.stringify(user),{headers:contentHeaders})
    //         .map(res=>res.json());
    // }

    login(username, password) {
      event.preventDefault();
      let body = JSON.stringify({ email:username, password:password });
      return this.http.post('http://localhost:3000/api/authenticate', body, { headers: contentHeaders }).map(res=>res.json());

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
        return this.http.post('http://localhost:3000/api/sign-up',JSON.stringify(user),{headers:headers}).map(res=>res.json());

    }
}
