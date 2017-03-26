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

  /**
   * creating a class
   * @param classroom
   * @returns {Observable<R>}
   */
  createClass(classroom) {
    let headers = authenticatedContentHeaders;
    return this.http.post(this.baseUrl + '/api/create-class', JSON.stringify(classroom), {headers: headers}).map(res=>res.json());
  }

  /**
   * get all the classes
   * @returns {Observable<R>}
   */
  getClasses() {
    let headers = authenticatedContentHeaders;
    console.log("Came to this point");
    return this.http.get(this.baseUrl + '/api/get-class', {headers: headers}).map(res=>res.json());
  }

  /**
   * get the current class
   * @param id
   * @returns {Observable<R>}
   */
  getCurrentClass(id){
    let headers = authenticatedContentHeaders;
    console.log("Came to this point");
    return this.http.get(this.baseUrl + '/api/get-single-class/'+id, {headers: headers}).map(res=>res.json());
  }

  /**
   * remove a class
   * @param id
   * @returns {Observable<R>}
   */
  removeClass(id) {
    let headers = authenticatedContentHeaders;
    return this.http.delete(this.baseUrl + '/api/remove-class/' + id,{headers:headers}).map(res=>res.json());
  }

  /**
   *
    * @param id
   * @returns {Observable<R>}
   */
  getLectures(id){

    let headers = authenticatedContentHeaders;
    return this.http.get(this.baseUrl + '/api/get-lectures/' + id,{headers:headers}).map(res=>res.json());
  }
  createLecture(lecture){
    let header=authenticatedContentHeaders;
    return this.http.post(this.baseUrl+'/api/create-lecture',JSON.stringify(lecture),{headers:header}).map(res=>res.json());
  }


  createFeedback(feedback){
    let header=authenticatedContentHeaders;
    return this.http.post(this.baseUrl+'/api/feedback/create-feedback',JSON.stringify(feedback),{headers:header}).map(res=>res.json());
  }

  removeFeedback(feedbackId) {
    let headers = authenticatedContentHeaders;
    return this.http.delete(this.baseUrl + '/api/feedback/remove-feedback/' + feedbackId,{headers:headers}).map(res=>res.json());
  }

  createQuestion(question){
    let header=authenticatedContentHeaders;
    return this.http.post(this.baseUrl+'/api/question/create-question',JSON.stringify(question),{headers:header}).map(res=>res.json());
  }

  createAnswer(answer){
    let header=authenticatedContentHeaders;
    return this.http.post(this.baseUrl+'/api/answer/answer-question',JSON.stringify(answer),{headers:header}).map(res=>res.json());
  }

  createMaterial(material){
    let header=authenticatedContentHeaders;
    return this.http.post(this.baseUrl+'/api/material/create-material',JSON.stringify(material),{headers:header}).map(res=>res.json());
  }

  removeQuestion(id) {
    let headers = authenticatedContentHeaders;
    return this.http.delete(this.baseUrl + '/api/question/remove-question/' + id,{headers:headers}).map(res=>res.json());
  }

  removeMaterial(id) {
    let headers = authenticatedContentHeaders;
    return this.http.delete(this.baseUrl + '/api/material/remove-material/' + id,{headers:headers}).map(res=>res.json());
  }
}
