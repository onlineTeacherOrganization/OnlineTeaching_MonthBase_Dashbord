import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LockStudentService {
  basUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }
  GetLockStudent() {
    return this.http.get(this.basUrl + 'Lock/GetLockedStudent');
  }
  ///Lock/searchLockedStudent?StudentName=me
  SearchStudent(name: string) {
    return this.http.get(this.basUrl + 'Lock/searchLockedStudent?StudentName=' + name);
  }
  UnLockStudent(id: any) {
    return this.http.post(this.basUrl + `Lock/UnLockUser?UserID=${id}`, {});
  }
  UnlockStudenSububject(id: any, subsublectid: any) {
    return this.http.post(this.basUrl + `Lock/UnLockStudentForSubSubject?studentID=${id}&SubSubject=${subsublectid}`, {});
    //   http:menanabel2-001-site1.atempurl.com/E-learning/Lock/UnLockStudentForSubSubject?studentID=1&SubSubject=
  }
  // /Lock/UnLockStudentForSubSubject
}
