import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExamsService } from './Exams.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // http://menanabel2-001-site1.atempurl.com/E-learning/Questions/1
  ExamQuestions = environment.BaseUrl + 'Admin/Exams/'
  baseUrlquestions = environment.BaseUrl + "Questions/";
  constructor(private http: HttpClient, private ExamsServ: ExamsService) { }
  GetExamQuestions(id: number) {
    return this.http.get(this.ExamQuestions + `${id}`)
  }
  GetQuestion(id: number) {
    return this.http.get(this.baseUrlquestions + `${id}`)
  }
  PostQuestions(questions: any) {
    return this.http.post(this.baseUrlquestions, questions)
  }

  PutQuestions(id: number, value: any) {
    return this.http.put(this.baseUrlquestions + `${id}`, value);
  }
  DeleteQuestions(id: number) {
    return this.http.delete(this.baseUrlquestions + `${id}`);
  }
  NameExam(id: any) {
    return this.ExamsServ.GetallExams()
  }
}
