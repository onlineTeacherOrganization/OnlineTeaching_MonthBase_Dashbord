import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  ReviewConfrim: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrlReview = environment.BaseUrl + "Reviews/Admin/Confirm";
  baseUrlpostReview = environment.BaseUrl + "Reviews";

  commonbaseurlreview = environment.BaseUrl + "Reviews/";
  constructor(private http: HttpClient) { }
  getallreview(index?: number, size: number = 20) {
    if (index) {
      return this.http.get(this.baseUrlReview + `?index=${index}&size=${size}` )
    }
    else {
      return this.http.get(this.baseUrlReview + `?size=${size}`)
    }
  }

  postreview(review: any, index?: number, size: number = 20) {

    return this.http.post(this.baseUrlpostReview, review)
  }
  putreviwe(id: number, review: any) {
    return this.http.put(this.commonbaseurlreview + `${id}`, review)
  }
  deletereview(id: number) {
    return this.http.delete(this.commonbaseurlreview + `${id}`)
  }

}
