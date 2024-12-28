import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {
  levels: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrlLevel = environment.BaseUrl + "Levels";
  constructor(private http: HttpClient) { }
  getalllevel() {
    return this.http.get(this.baseUrlLevel).subscribe((ele: any) => {
      this.levels.next(ele.items);
    })
  }
  postlevel(level: any) {
    return this.http.put(this.baseUrlLevel, level)
  }
  //http://hossamfathi-001-site1.atempurl.com/E-learning/Levels/1
  putlevel(id: number, value: any) {

    return this.http.put(this.baseUrlLevel + `/${id}`, value);
  }

}
