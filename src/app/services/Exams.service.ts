import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  Exams: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrlExams = environment.BaseUrl + "Admin/Exams";
  constructor(private http: HttpClient) { }
  GetallExams(index?: number, size: number = 20) {
    let get = this.baseUrlExams;
    if (index) {
      get = `${this.baseUrlExams}?index=${index}&size=${size}`;
      return this.http.get(get)
    }
    else {
      get = `${get}?size=${size}`;
      return this.http.get(get)
    }

  }
  GetExam() {

  }
  PostExams(Exams: any) {
    return this.http.post(this.baseUrlExams, Exams)
  }
  GetExamsByID(id: any) {
    return this.http.get(this.baseUrlExams + `/${id}`)
  }
  GetLectureByID(id: any) {
    return this.http.get(environment.BaseUrl + `Lectures/GetByAdmin/${id}`)
  }

  PutExams(id: number, value: any) {
    return this.http.put(this.baseUrlExams + `/${id}`, value);
  }
  DeleteExams(id: number) {
    return this.http.delete(this.baseUrlExams + `/${id}`);
  }
  SearchExams(Exam: string, index?: number, size: number = 10) {

    if (index) {
      return this.http.get(this.baseUrlExams + `/Search?ExamName=${Exam}&index=${index}&size=${size}`)
    }
    else {
      return this.http.get(this.baseUrlExams + `/Search?ExamName=${Exam}&size=${size}`)
    }
  }
  // http://hossamfathi-001-site1.atempurl.com/E-Learning/Admin/Exams/Accept Re open Exam
  PostAcceptReopenExam(ReExams: any) {
    return this.http.post(this.baseUrlExams + '/Accept Re open Exam', ReExams)
  }
  // http://hossamfathi-001-site1.atempurl.com/E-Learning/Admin/Exams/Re open Exam Requests
  GetAcceptReopenExam() {
    return this.http.get(this.baseUrlExams + '/Re open Exam Requests')
  }
  SearchByStudentInfo(Phone: any, email: any) {
    return this.http.get(this.baseUrlExams + `/SearchByStudentInfo?studentphone=${Phone}&Email=${email}`)
  }
  PutAssigment(data: any) {
    return this.http.put(environment.BaseUrl + 'Assigment', data)
  }
  PutQuiz(data: any) {
    return this.http.put(environment.BaseUrl + 'Quiz', data)
  }


  GetAssignment(id: any) {
    return this.http.get(environment.BaseUrl + 'Assigment/Get?AssigmentID=' + id);
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Assigment/Get?AssigmentID=3
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Quiz/Get?quizID=4
  }
  GetQuiz(id: any) {
    return this.http.get(environment.BaseUrl + 'Quiz/Get?quizID=' + id);
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Assigment/Get?AssigmentID=3
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Quiz/Get?quizID=4
  }
}
