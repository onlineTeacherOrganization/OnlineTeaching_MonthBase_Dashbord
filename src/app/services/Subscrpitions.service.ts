import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubscrpitionsService {
  //menanabel2-001-site1.atempurl.com/E-learning/Subscribtion/Admin/GetNotConfirmedSubscribtion
  baseUrlSubscrpitions = environment.BaseUrl + "Subscribtion/Admin/";
  AllStudent = environment.BaseUrl + 'Students/Admin/getAll';
  AllSubject = environment.BaseUrl + 'Subjects/Admin/GetAll';
  constructor(private http: HttpClient) { }
  SearchSubscrpitions(studentName: string, phone: string, index?: number, size: number = 10) {
    if (index) {
      return this.http.get(this.baseUrlSubscrpitions + `Filter?studentName=${studentName}&phone=${phone}&index=${index}&size=${size}`)
    }
    else {
      return this.http.get(this.baseUrlSubscrpitions + `Filter?StudentName=${studentName}&phone=${phone}&size=${size}`)

    }
  }
  GetActiveSubscribtion(index?: number, sizeindex: number = 20) {
    if (index) {
      return this.http.get(`${this.baseUrlSubscrpitions}GetActiveSubscribtion?index=${index}&size=${sizeindex}`)
    }
    else {
      return this.http.get(`${this.baseUrlSubscrpitions}GetActiveSubscribtion?size=${sizeindex}`)
    }
  }
  GetNotConfirmedSubscribtion(index?: number, sizeindex: number = 20) {
    // if (index) {
    //   return this.http.get(`${this.baseUrlSubscrpitions}GetNotConfirmedSubscribtion?index=${index}&size=${sizeindex}`)
    // }
    // else {
    //   return this.http.get(`${this.baseUrlSubscrpitions}GetNotConfirmedSubscribtion?size=${sizeindex}`)
    // }
    return this.http.get(`${this.baseUrlSubscrpitions}GetNotConfirmedSubscribtion`)

  }
  GetSubscribtionForStudent(id: number) {
    return this.http.get(`${this.baseUrlSubscrpitions}GetSubscribtionForStudent/${id}`)
  }
  Delete(ele: any) {
    return this.http.delete(environment.PhotoUrl + `Admin/Delete`, { body: ele })
  }
  PutSubscribtion(ele: any) {
    return this.http.put(environment.BaseUrl + "Subscribtion", ele);
  }
  PostSubSubscription(ele: any) {
    return this.http.post(environment.BaseUrl + "Subscribtion", ele);
  }
  GetAllStudents() {
    let url = `${environment.BaseUrl}/Students`;
    console.log("getAllStudent");
    return this.http.get(`${this.AllStudent}`)
  }
  GetAllSubjects(size: number = 20) {
    return this.http.get(environment.BaseUrl + `Subjects/Admin/GetAll?size=` + size)
  }
  DownloadSubscriptiontData(id: any): Observable<Blob> {
    return this.http.get(environment.BaseUrl + 'Subscribtion/DownloadInfo?subjectID=' + id, { responseType: 'blob' });
  }
}
