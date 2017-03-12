import {Feedback} from "./Feedback";
import {Question} from "./Question";
import {Material} from "./Material";
export class Lecture{
  id:any;
  lectureSummary:string;
  lectureNumber:number;
  feedbacks:Feedback[];
  questions:Question[];
  materials:Material[];
}
