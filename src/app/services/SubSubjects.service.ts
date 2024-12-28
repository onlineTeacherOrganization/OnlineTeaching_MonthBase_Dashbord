import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubSubjectsService {
  baseUrlsubsubjects = environment.BaseUrl + "subsubjects/Admin/";
  url = environment.BaseUrl;
  constructor(private http: HttpClient) { }
  GetAllSubsubjects(index?: number, size: number = 20) {
    let get = this.baseUrlsubsubjects + "GetAll/"
    if (index) {
      get = `${this.baseUrlsubsubjects}GetAll/?index=${index}&size=${size}`;
      return this.http.get(get)
    }
    else {
      get = `${get}?size=${size}`;
      return this.http.get(get)
    }
  }
  getAllSubsubjects(size: number) {
    return this.http.get(this.baseUrlsubsubjects + "GetAll/" + `?size=${size}`)
  }
  getallsubjects(size: number = 20) {
    let get = this.baseUrlsubsubjects + "GetAll/"
    get = `${get}?size=${size}`;
    return this.http.get(get)
  }
  GetSubsubjects(index?: number, size: number = 20) {
    return this.http.get(this.baseUrlsubsubjects + "GetAll")
  }
  //  

  PostSubsubjects(subsubjects: any) {
    return this.http.post(this.baseUrlsubsubjects + "add/", subsubjects)
  }

  PutSbsubjects(id: number, value: any) {
    return this.http.put(this.baseUrlsubsubjects + "update/" + `${id}`, value);
  }
  DeleteSubsubjects(id: number) {
    return this.http.delete(this.baseUrlsubsubjects + "delete/" + `${id}`);
  }
  SearchSubsubjects(subjecname: string, index?: number, size: number = 10) {

    if (index) {
      return this.http.get(environment.BaseUrl + `SubSubjects/Search?SubSubjectName==${subjecname}&index=${index}&size=${size}`)
    }
    else {
      return this.http.get(environment.BaseUrl + `SubSubjects/Search?SubSubjectName=${subjecname}&size=${size}`)
    }
  }
  SearchSubjects(id: any) {
    return this.http.get(environment.BaseUrl + `SubSubjects/GetForSubject/${id}`)
  }
  GetsubSubjectById(id: any) {
    return this.http.get(environment.BaseUrl + `SubSubjects/Admin/Get?SubSubjectID=` + id)
  }
  GetSubjectsById(id: any) {
    return this.http.get(environment.BaseUrl + `Subjects/student/` + id)
  }

  GetAllSubject() {
    return this.http.get(environment.BaseUrl + `Subjects/Admin/GetAll`)
  }
  GetAllSubSubject() {
    return this.http.get(this.baseUrlsubsubjects + `GetAll`)
  }
  getAllSubSubject(size: number = 20) {
    return this.http.get(this.baseUrlsubsubjects + `GetAll?size=${size}`)
  }
  GetAllLectures() {
    return this.http.get(environment.BaseUrl + "Lectures")
  }
  getAllLectures(size: number = 20) {
    let get = `${environment.BaseUrl + "Lectures"}?size=${size}`;
    return this.http.get(get)
  }
  getlecture(id: any) {
    let get = `${environment.BaseUrl + "Lectures"}/GetByAdmin/` + id;
    return this.http.get(get)
  }
  // 
  // https://hardcore-moore.162-220-162-242.plesk.page/E-Learning/Lectures/GetByAdmin/2
  GetAllForSubSubject(id: any, index?: number, size: number = 10) {
    // return this.http.get(environment.BaseUrl + `Students/Admin/getAllForSubsubject/${id}`)
    if (index) {
      return this.http.get(environment.BaseUrl + `Students/Admin/getAllForSubsubject/${id}?index=${index}&size=${size}`)
    }
    else {
      return this.http.get(environment.BaseUrl + `Students/Admin/getAllForSubsubject/${id}?size=${size}`)
    }
  }

  getSubsubject(id: any) {
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/SubSubjects/Admin/Get?SubSubjectID=1
    return this.http.get(environment.BaseUrl + `SubSubjects/Admin/Get?SubSubjectID=` + id)
  }
}
