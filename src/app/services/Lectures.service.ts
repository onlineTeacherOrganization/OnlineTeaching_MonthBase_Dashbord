import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  baseUrlLectures = environment.BaseUrl + "Lectures";
  constructor(private http: HttpClient) { }
  GetallLectures(index?: number, size: number = 20) {
    let get = this.baseUrlLectures;
    if (index) {
      get = `${this.baseUrlLectures}?index=${index}&size=${size}`;
      return this.http.get(get)
    }
    else {
      get = `${get}?size=${size}`;
      return this.http.get(get)
    }
  }
  GetLecture(id: any) {
    return this.http.get(this.baseUrlLectures + '/GetByAdmin/' + id)
  }
  GetLectures() {
    return this.http.get(this.baseUrlLectures)
  }
  getLectures(size: any) {
    return this.http.get(this.baseUrlLectures + `?size=${size}`)
  }
  PostLectures(Lectures: any) {
    return this.http.post(this.baseUrlLectures, Lectures)
  }
  GetLecturesByID(id: NumberConstructor) {
    return this.http.get(this.baseUrlLectures + `/${id}`)
  }

  PutLectures(id: number, value: any) {
    return this.http.put(this.baseUrlLectures + `/${id}`, value);
  }
  DeleteLectures(id: number) {
    return this.http.delete(this.baseUrlLectures + `/${id}`);
  }
  SearchLectures(Lecture: string, index?: number, size: number = 10) {
    if (index) {
      return this.http.get(this.baseUrlLectures + `/filter?Name=${Lecture}&index=${index}&size=${size}`)
    }
    else {
      return this.http.get(this.baseUrlLectures + `/filter?Name=${Lecture}&size=${size}`)
    }
  }
  Get_ReOpenWatchingRequests(index?: number, size: number = 20) {
    let get = this.baseUrlLectures;
    if (index) {
      get = `${this.baseUrlLectures}/Get_ReOpenWatchingRequests?index=${index}&size=${size}`;
      return this.http.get(get)
    }
    else {
      get = `${get}/Get_ReOpenWatchingRequests?size=${size}`;
      return this.http.get(get)
    }
  }
  Confirm_OpenWatching(ConfirmOpenWatching: any) {
    return this.http.post(this.baseUrlLectures + '/Confirm_OpenWatching', ConfirmOpenWatching)
  }
  GetBySubSubject(id: any) {
    return this.http.get(this.baseUrlLectures + `/GetBySubSubject/${id}`)
  }
  getSubsubject(id: any) {
    // https://hardcore-moore.162-220-162-242.plesk.page/E-learning/SubSubjects/Admin/Get?SubSubjectID=1
    return this.http.get(environment.BaseUrl + `SubSubjects/Admin/Get?SubSubjectID=` + id)
  }
}
