import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Info} from "../auth/Info";
import {User} from "../models/user";

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

  getAll() {
    return this.http.get(environment.apiUrl + "/user/getAllUsers");
  }

  getById(id: number) {
    return this.http.get(environment.apiUrl + "/user/getUser/" + id);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/user/deleteUser/" + id);
  }
  update(user: User){
    return this.http.post(environment.apiUrl+"/user/updateUser", user);
  }
}
