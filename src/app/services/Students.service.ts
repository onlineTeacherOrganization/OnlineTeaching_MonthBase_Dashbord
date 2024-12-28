import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  baseUrlStudents = environment.BaseUrl + "Students/Admin/";
  commonbase = environment.BaseUrl + 'Students/Admin/GetAll';
  constructor(private http: HttpClient) { }
  GetAllStudents(index?: number, sizeindex: number = 20) {
    if (index) {
      return this.http.get(`${this.commonbase}?index=${index}&size=${sizeindex}`)
    }
    else {
      return this.http.get(`${this.commonbase}?size=${sizeindex}`)
    }
  }
  GetStudents() {
    return this.http.get(`${this.commonbase}`)
  }
  SearchStudents(studentName: string, phone: string, index?: number, size: number = 10) {
    if (index) {
      return this.http.get(this.baseUrlStudents + `filter?studentName=${studentName}&phone=${phone}&index=${index}&size=${size}`)
    }
    else {
      return this.http.get(this.baseUrlStudents + `filter?StudentName=${studentName}&phone=${phone}&size=${size}`)

    }
  }
  UpdatePhoneNumberForStudentByAdmin(Edit: any) {
    return this.http.put(this.baseUrlStudents + 'UpdatePhoneNumberForStudentByAdmin', Edit);
  }
  DownloadStudentData(): Observable<Blob> {
    return this.http.get(this.baseUrlStudents + 'DownloadStudentData', { responseType: 'blob' });
  }
  LockStudent(id: any) {
    // return this.http.post(environment.BaseUrl + `Lock/LockUser/${id}`, {});
    return this.http.post(environment.BaseUrl +`Lock/LockUser?UserID=${id}`,{});

  }
  LockStudentForSubSubject(Studentid: any, subsubject: any, reason: any) {
    let params = new HttpParams();
    params = params.append('UserID', Studentid).append('SubSubject', `${subsubject}`).append('reason', `${reason}`);
    // Lock/LockStudentForSubSubject?studentID=123&SubSubject=&Reason=
    return this.http.post(environment.BaseUrl + `Lock/LockStudentForSubSubject?studentID=${Studentid}&SubSubject=${subsubject}&Reason=${reason}`,{});
  }
}
