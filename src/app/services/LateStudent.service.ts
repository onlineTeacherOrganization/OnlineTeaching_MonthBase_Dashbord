import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LateStudentService {
  // http://menanabel2-001-site1.atempurl.com/E-learning/LateStudent/1
  baseUrlLateStudent = environment.BaseUrl + "LateStudent/";
  constructor(private http: HttpClient) { }
  GetAllLateStudent(index?: number, size: number = 10) {
    if (index) {
      return this.http.get(`${this.baseUrlLateStudent}?index=${index}&size=${size}`)
    }
    else {

      return this.http.get(`${this.baseUrlLateStudent}?size=${size}`);
    }
  }
  PostLateStudent(LateStudent: any) {
    return this.http.post(this.baseUrlLateStudent, LateStudent)
  }

  PutLateStudent(id: number, value: any) {
    return this.http.put(this.baseUrlLateStudent + "/" + `${id}`, value);
  }
  DeleteLateStudent(id: number) {
    return this.http.delete(this.baseUrlLateStudent + "/" + `${id}`);
  }
  LockLateStudent() {
    return this.http.get(environment.BaseUrl + 'Lock/lockLateStudent');
  }
}
