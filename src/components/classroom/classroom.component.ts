import { Component } from '@angular/core';
import {ClassService} from "../../services/class.service";
import {ClassRoom} from "../../models/Class";
import {Feedback} from "../../models/Feedback";
import {Question} from "../../models/Question";
import {Lecture} from "../../models/Lecture";


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
  constructor(private classService:ClassService){
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
}
