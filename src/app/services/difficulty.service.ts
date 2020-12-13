import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Difficulty} from "../models/difficulty";
import {Injectable} from "@angular/core";
@Injectable()
export class DifficultyService {

  constructor(private http: HttpClient) {
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/level/deleteLevel/' + id);
  }

  getAll() {
    return this.http.get(environment.apiUrl + '/level/getAllLevels');
  }

  getID(id: number) {
    return this.http.get(environment.apiUrl + '/level/getLevel/' + id);
  }

  update(difficulty: Difficulty) {
    return this.http.post(environment.apiUrl + '/level/updateLevel', difficulty);
  }

  save(difficulty: Difficulty) {
    return this.http.put(environment.apiUrl + '/level/saveLevel', difficulty);
  }
}
