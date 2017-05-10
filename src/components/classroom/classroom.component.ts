import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {Feedback} from "../../models/Feedback";
import {Question} from "../../models/Question";
import {Lecture} from "../../models/Lecture";
import {ActivatedRoute, Router, Params} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Answer} from "../../models/Answer";
import {ClassRoom} from "../../models/Class";
import {UserService} from "../../services/user.service";
import {FileUploader} from "ng2-file-upload";



@Component({
  moduleId:module.id,
  selector: 'classroom',
  templateUrl: `components/classroom/classroom.component.html`,
  providers:[ClassService],

})

export class ClassRoomComponent{

  // public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});

  classRoomName:string;
  feedbackCount=0;
  lectureCount=0;
  questionCount=0;
  enrollmentCount=0;


  lectures:Lecture[];
  currentClass=new ClassRoom();

  //for viewing questions and answers
  currentViewingQuestion:Question;
  currentViewingAnswer:Answer;

  //submitting feedback, questions, materials, answers
  submitFeedback={details:"",semantic:"",_lecture:""};
  submitQuestion={title:"",details:"",link:"",_lecture:""};
  submitMaterial={type:"",details:"",link:"none",_lecture:""};
  submitAnswer={_question:"",details:"",link:""};
  submitFile:any;


  createLectureDetails={_class:"",lectureTitle:"",lectureSummary:"", lectureNumber:0};

  uploader:FileUploader = new FileUploader({url: "http://localhost:3000/api/material/create-material"});

  constructor(private userService:UserService,private classService:ClassService,private route: ActivatedRoute,private router:Router){
    this.classRoomName="This Class Name";

    let q=new Question();
    q.title="";
    q.details="";
    this.currentViewingQuestion=q;

    let a=new Answer();
    a.details="No answer yet";
    this.currentViewingAnswer=a;


    //taking the lectures
    this.route.params
      .switchMap(params => this.classService.getLectures(params['id']))
      .subscribe(lectures => {

        if (lectures){
          this.lectures = lectures;
          for(var i=0;i<lectures.length;i++){
            this.lectureCount+=1;
            this.feedbackCount+=lectures[i].feedbacks.length;
            this.questionCount+=lectures[i].questions.length;
          }
        }
        else console.log('error');
      });

    this.route.params
      .switchMap(params => this.classService.getCurrentClass(params['id']))
      .subscribe(currentClass => {

        if (currentClass){
          console.log(currentClass);
          this.enrollmentCount=currentClass.enrollments.length;
          this.currentClass = currentClass;
        }
        else console.log('error');
      });

    //initialing the class id
    this.route.params.subscribe((params:Params)=>{
      this.createLectureDetails._class=params['id'];
    });


  }



  /**
   *  ===================================================================
   *          FEEDBACK RELATED FUNCTIONS
   *  ===================================================================
   *
   * */

  saveFeedback(){
    console.log(this.submitFeedback);
    this.classService.createFeedback(this.submitFeedback).subscribe(data=>{
      if(data.success){
        console.log("Feedback created");
        this.updateLecture();
      }
      else{
        console.log(data.msg);
      }
    });
    // this.currentLectureFeedbackByStudent="";
  }

  removeFeedback(feedbackId){
    console.log(feedbackId);
    this.classService.removeFeedback(feedbackId).subscribe(res=>{
      console.log(res);
      this.updateLecture();
    });
  }

  showAddFeedbackModal(lectureId){
    this.submitFeedback._lecture=lectureId;
  }

  /**
   *  ===================================================================
   *          QUESTION RELATED PROFILE ROUTES
   *  ===================================================================
   *
   * */

  saveQuestion(){
    this.classService.createQuestion(this.submitQuestion).subscribe(data=>{
      if(data.success){
        console.log("Question created");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });
  }

  viewAnswerQuestionModal(questionId){
    for(var i=0;i<this.lectures.length;i++){
      for(var j=0;j<this.lectures[i].questions.length;j++){
        if(this.lectures[i].questions[j]._id==questionId) {
          this.currentViewingQuestion = this.lectures[i].questions[j];
          this.submitAnswer._question=this.currentViewingQuestion._id;
        }
      }
    }
  }

  saveAnswer(){
    this.classService.createAnswer(this.submitAnswer).subscribe(data=>{
      if(data.success){
        console.log("Answer created");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });
}

  viewAnswer(questionId){
    for(var i=0;i<this.lectures.length;i++){
      for(var j=0;j<this.lectures[i].questions.length;j++){
        if(this.lectures[i].questions[j]._id==questionId) {
          this.currentViewingQuestion = this.lectures[i].questions[j];
          if(this.currentViewingQuestion.answers.length==0){
            let a=new Answer();
            a.details="No answer yet";
            this.currentViewingAnswer=a;

          }
          else {
            this.currentViewingAnswer=this.currentViewingQuestion.answers[0];
          }
          console.log(this.currentViewingQuestion)
        }
      }
    }
  }

  removeQuestion(questionId){
    console.log("REMOVE QUESTION "+questionId);
    this.classService.removeQuestion(questionId).subscribe(data=>{
      if(data.success){
        console.log("Question removed");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });

  }

  showAskQuestionModal(lectureId){
    this.submitQuestion._lecture=lectureId;

  }


  /**
   *  ===================================================================
   *          MATERIAL RELATED FUNCTIONS
   *  ===================================================================
   *
   * */
  saveMaterial()
  {
    console.log(this.submitMaterial);
    this.classService.createMaterial(this.submitMaterial,this.submitFile).subscribe(data=>{
      if(data.success){
        console.log("Material Created");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });
  }

  removeLectureMaterial(materialId){
    console.log("Remove the material id: "+materialId);
    this.classService.removeMaterial(materialId).subscribe(data=>{
      if(data.success){
        console.log("Materials removed");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });
  }

  downloadLectureMaterial(id,link){
    console.log("Download");
  }

  showAddMaterialModal(lectureId){
    console.log('add lecture material');
    this.submitMaterial._lecture=lectureId;
  }


  unenrollStudent(_id){
    console.log(_id);
    this.classService.unenrollStudent(this.currentClass._id,_id).subscribe(data=> {
      console.log(data.success);
      this.updateLecture();
    });
  }


  

  /**
   *  ===================================================================
   *          LECTURE RELATED FUNCTIONS
   *  ===================================================================
   *
   * */

  createLecture(){
    this.classService.createLecture(this.createLectureDetails).subscribe(data=>{
      if(data.success){
        console.log("Class Created");
        this.updateLecture();
      }
      else{
        console.log(data.msg);
      }
    });
  }

  /**
   * update the lectures
   */
  updateLecture(){
    //taking the lectures
    this.route.params
      .switchMap(params => this.classService.getLectures(params['id']))
      .subscribe(lectures => {
        if (lectures){
          this.lectures = lectures;
        }
        else console.log('error');
      });
  }

  /**
   * uploading files
   */
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.submitFile=fileList[0];
      console.log(this.submitFile.name);

      // let formData:FormData = new FormData();
      // formData.append('uploadFile', file, file.name);
      // let headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // let options = new RequestOptions({ headers: headers });
      // this.http.post(`${this.apiEndPoint}`, formData, options)
      //   .map(res => res.json())
      //   .catch(error => Observable.throw(error))
      //   .subscribe(
      //     data => console.log('success'),
      //     error => console.log(error)
      //   )

    }
  }

}
