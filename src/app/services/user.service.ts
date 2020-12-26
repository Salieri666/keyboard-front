import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Info} from "../auth/Info";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  changeLevel(level: number) {
    if (localStorage.getItem("userLevelId") == "null" || parseInt(localStorage.getItem("userLevelId")) < level) {
      this.http.get<Info>(environment.apiUrl + '/user/getUser/' + parseInt(localStorage.getItem("userId"))).subscribe((data: Info) => {
        data.levelId = level.toString();
        this.http.post(environment.apiUrl + '/user/changeUserLevel', data).subscribe();
      });
      localStorage.removeItem('userLevelId');
      localStorage.setItem('userLevelId', level.toString());
    }
  }
}
