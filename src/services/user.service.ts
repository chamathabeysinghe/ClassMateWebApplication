import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {contentHeaders} from "../common/headers";

@Injectable()
export class UserService{

    baseUrl="http://localhost:3000/api";
    accountType="null";
    token="";
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
            localStorage.removeItem('account_type');
            localStorage.setItem('account_type', response.accountType);
            this.accountType=response.accountType;
            this.token=response.token;
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

    signUp(user){
        var headers=new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.baseUrl+'/sign-up',JSON.stringify(user),{headers:headers}).map(res=>res.json());

    }

    getAccountType(){
      if(this.accountType=="null"){
        this.accountType=localStorage.getItem("account_type");
      }
      return this.accountType;
    }
}
