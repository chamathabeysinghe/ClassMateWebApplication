import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassService{

    constructor(private http:Http){
        console.log('Class service initialized...');
    }

    createClass(classroom){
        var headers=new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/api/create-class',JSON.stringify(classroom),{headers:headers}).map(res=>res.json());

    }
}