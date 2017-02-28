import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassService{
    baseUrl="http://localhost:3000";
    constructor(private http:Http){
        console.log('Class service initialized...');
    }
    createClass(classroom){
        var headers=new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.baseUrl+'/api/create-class',JSON.stringify(classroom),{headers:headers}).map(res=>res.json());
    }
    getClasses(){
        console.log("Came to this point");
        return this.http.get(this.baseUrl+'/api/get-class').map(res=>res.json());
    }
    removeClass(id){
        return this.http.delete(this.baseUrl+'/api/remove-class/'+id).map(res=>res.json());
    }
}