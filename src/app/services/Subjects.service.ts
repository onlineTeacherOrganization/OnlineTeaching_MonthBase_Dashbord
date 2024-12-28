import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  baseUrlsubjects = environment.BaseUrl + "Subjects";
  commonbase = environment.BaseUrl + 'Subjects/Admin/GetAll';
  constructor(private http: HttpClient, private cookies: CookieService) { }
  GetAllSubjects(index?: number, sizeindex: number = 20) {
    if (index) {
      return this.http.get(`${this.commonbase}?index=${index}&size=${sizeindex}`)
    }
    else {
      return this.http.get(`${this.commonbase}?size=${sizeindex}`)
    }
  }
  GetAllSubjects2(sizeindex: number = 20) {
      return this.http.get(`${this.commonbase}?size=${sizeindex}`)
  }
  GetSubjects() {
    return this.http.get(`${this.commonbase}`)
  }
  GetSubject(id: any) {
    return this.http.get(this.baseUrlsubjects + '/student/' + id)
  }
  PostSubjects(subjects: any) {
    return this.http.post(this.baseUrlsubjects + "/Admin/add", subjects)
  }

  PutSubjects(id: number, value: any) {
    return this.http.put(this.baseUrlsubjects + "/Admin/update/" + `${id}`, value);
  }
  DeleteSubjects(id: number) {
    return this.http.delete(this.baseUrlsubjects + "/Admin/delete/" + `${id}`);
  }
  SearchSubjects(subjecname: string, index?: number, size: number = 10) {

    if (index) {
      return this.http.get(environment.BaseUrl + 'Subjects/Admin/Search/' + `${subjecname}?index=${index}&size=${size}`)
    }
    else {
      return this.http.get(environment.BaseUrl + 'Subjects/Admin/Search/' + `${subjecname}?size=${size}`)

    }
  }
  GetLevels() {
    return this.http.get(environment.BaseUrl + 'Levels')
  }
  // http://menanabel2-001-site1.atempurl.com/E-learning/Levels/
}
