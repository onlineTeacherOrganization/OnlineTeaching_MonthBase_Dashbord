import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  Setting: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrlSetting = environment.BaseUrl + "Setting";
  constructor(private http: HttpClient) { }
  GetAllSetting() {
    return this.http.get(this.baseUrlSetting)
  }
  PostSettings(settings: any) {

    return this.http.post(this.baseUrlSetting, settings)
  }
  PutSettings(id: number, settings: any) {
    return this.http.put(this.baseUrlSetting + `/${id}`, settings);
  }
  ChangePasswotd(data: any) {
    return this.http.post(environment.BaseUrl + 'Auth/ChangePassword', data);
  }
  DeleteSettings() {

    return this.http.delete(this.baseUrlSetting)
  }

}
