import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizAssService {
  BaseURL = environment.BaseUrl
  constructor(private http: HttpClient) { }
  PostQuiz(obj: any) {
    return this.http.post(this.BaseURL + 'Quiz', obj);
  }


  GetAssignment(id: any) {
    return this.http.post(this.BaseURL + 'Assigment/Get?AssigmentID=', id);
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Assigment/Get?AssigmentID=3
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Quiz/Get?quizID=4
  }
  GetQuiz(id: any) {
    return this.http.post(this.BaseURL + 'Quiz/Get?quizID=', id);
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Assigment/Get?AssigmentID=3
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/Quiz/Get?quizID=4
  }
  GetLectureByID(id: any) {
    return this.http.get(environment.BaseUrl + `Lectures/GetByAdmin/${id}`)
  }
  PostAssigment(obj: any) {
    return this.http.post(this.BaseURL + 'Assigment', obj);
  }
  GetAllLecutre() {
    return this.http.get(this.BaseURL + 'Lectures');
  }
  getAllLecutre(size = 20) {
    return this.http.get(this.BaseURL + `Lectures?size=${size}`);
  }
}
