import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  Exams!: any;
  Lectures: any
  Subjects!: any;
  SubSubjects!: any;
  AllSubscribtion!: any;
  NoComfirmSubscribtion!: any;

  constructor(private http: HttpClient) { }
  GetExams() {
    return this.http.get(environment.BaseUrl + 'Admin/Exams')
  }
  GetLectures() {
    return this.http.get(environment.BaseUrl + 'Lectures')
  }
  GetSubjects() {
    return this.http.get(environment.BaseUrl + 'Subjects/Admin/GetAll')
  }
  GetSubSubjects() {
    return this.http.get(environment.BaseUrl + 'subsubjects/Admin/GetAll')
  }
  GetAllSubscribtion() {
    return this.http.get(environment.BaseUrl + 'Subscribtion/Admin/GetActiveSubscribtion')
  }
  VAllSubscribtion() {
    return this.http.get(environment.BaseUrl + 'Subscribtion/Admin/GetActiveSubscribtion').subscribe((ele: any) => {
      this.AllSubscribtion = ele;
    })
  }
  GetNoComfirmSubscribtion() {
    return this.http.get(environment.BaseUrl + 'Subscribtion/Admin/GetNotConfirmedSubscribtion')
  }
  GetStudent() {
    return this.http.get(environment.BaseUrl + 'Students/Admin/GetAll')
  }
  GetReopenLectures() {
    return this.http.get(environment.BaseUrl + 'Lectures/Get_ReOpenWatchingRequests')
  }
  // Admin/Exams/Re%20open%20Exam%20Requests
  GetReExams() {
    return this.http.get(environment.BaseUrl + 'Admin/Exams/Re open Exam Requests')
  }
}
