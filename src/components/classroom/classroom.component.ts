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
  selector: 'classroom',
  templateUrl: `components/classroom/classroom.component.html`,
  providers:[ClassService]
})

export class ClassRoomComponent{


  classRoomName:string;
  feedbacks:Feedback[];
  questions:Question[];
  lectures:Lecture[];

  currentViewingQuestion:Question;
  currentViewingQuestionAnswer:string;
  currentViewingFeedback:Feedback;

  addFeedbackLectureId=0;
  submitFeedback={details:"",semantic:""};


  createLectureDetails={_class:"",lectureTitle:"",lectureSummary:"", lectureNumber:0};

  constructor(private classService:ClassService,private route: ActivatedRoute,private router:Router){
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


    //taking the lectures
    this.submitFeedback.details="";
    this.submitFeedback.semantic="";
    this.route.params
      .switchMap(params => this.classService.getLectures(params['id']))
      .subscribe(lectures => {
        console.log("We came to this point also 4444444");

        if (lectures){
          this.lectures = lectures;
          console.log(lectures);
        }
        else console.log('error');
      });

    //initialing the class id
    this.route.params.subscribe((params:Params)=>{
      this.createLectureDetails._class=params['id'];
    });


  }

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

  removeLectureMaterial(id){
    console.log("Remove the id: "+id);
  }
  downloadLectureMaterial(id,link){
    console.log("Download");
  }

  answerQuestion(questionId){
    this.currentViewingQuestion=this.questions[0];
    console.log("This is the id: "+questionId);
  }

  viewAnswer(questionId){
    this.currentViewingQuestion=this.questions[0];
    console.log("This is the question id: "+questionId);
  }

  removeQuestion(questionId){

  }
  saveAnswer(){
    console.log(this.currentViewingQuestionAnswer);
  }

  removeFeedback(feedbackId){
    console.log(feedbackId);
    this.classService.removeFeedback(feedbackId).subscribe(res=>{
      console.log(res);
      this.updateLecture();
    });
  }

  addMaterial(lectureId){
    console.log('add lecture material');
  }


  showAddFeedbackModal(lectureId){
    this.addFeedbackLectureId=lectureId;
  }

  saveFeedback(){
    console.log(this.submitFeedback);
    // this.currentLectureFeedbackByStudent="";
  }

  createLecture(){
    console.log("Create new lecture");

    this.classService.createLecture(this.createLectureDetails).subscribe(data=>{
      if(data.success){
        console.log("Class Created");
      }
      else{
        console.log(data.msg);
      }
    });
  }

}
