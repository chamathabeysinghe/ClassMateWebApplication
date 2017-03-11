import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {Feedback} from "../../models/Feedback";
import {Question} from "../../models/Question";
import {Lecture} from "../../models/Lecture";
import {ActivatedRoute, Router, Params} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId:module.id,
  selector: 'student-classroom',
  templateUrl: `components/student-classroom/student-classroom.component.html`,
  providers:[ClassService]
})

export class StudentClassroomComponent {

  classRoomName:string;
  feedbacks:Feedback[];
  questions:Question[];
  lectures:Lecture[];

  currentViewingQuestion:Question;
  currentViewingQuestionAnswer:string;

  currentViewingFeedback:Feedback;

  addFeedbackLectureId=0;
  currentLectureFeedbackByStudent="";

  constructor(private classService:ClassService,private route: ActivatedRoute,private router:Router){
    var token=localStorage.getItem('id_token');
    console.log("********************************");

    console.log(token);
    this.classRoomName="This Class Name";

    let f=new Feedback();
    f.details="What the fuck";
    this.feedbacks=[];
    this.feedbacks.push(f);
    this.currentViewingFeedback=f;

    let q=new Question();
    q.title="what the fuck?"
    q.details="How to fuck";
    this.questions=[];
    this.questions.push(q);
    this.currentViewingQuestion=q;
    let le=new Lecture();
    le.lectureNumber=1;
    le.id=1;
    le.lectureSummary="Title of the lecture is here";
    this.lectures=[];
    this.lectures.push(le);

    let le2=new Lecture();
    le2.lectureNumber=2;
    le2.id=2;
    le2.lectureSummary="Title of the lecture is here 2";
    this.lectures.push(le2);



  }


  removeLectureMaterial(id){
    console.log("Remove the id: "+id);
  }

  answerQuestion(questionId){
    this.currentViewingQuestion=this.questions[0];
    console.log("This is the id: "+questionId);
  }

  viewAnswer(questionId){
    this.currentViewingQuestion=this.questions[0];
    console.log("This is the question id: "+questionId);
  }

  removeQuestion(){

  }
  saveAnswer(){
    console.log(this.currentViewingQuestionAnswer);
  }

  removeFeedback(feedbackId){
  }

  viewFeedback(feedbackId){
    this.currentViewingFeedback=this.feedbacks[0];
  }

  addMaterial(lectureId){
    console.log('add lecture material');
  }


  showAddFeedbackModal(lectureId){
    this.addFeedbackLectureId=lectureId;
  }

  saveFeedback(){
    console.log(this.currentLectureFeedbackByStudent);
    this.currentLectureFeedbackByStudent="";
  }





}
