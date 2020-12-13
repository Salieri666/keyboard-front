import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Exercise} from "../models/exercise";
import {Injectable} from "@angular/core";
@Injectable()
export class ExerciseService {
  constructor(private http: HttpClient) {
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/exercise/deleteExercise/' + id);
  }

  getAll() {
    return this.http.get(environment.apiUrl + '/exercise/getAllExercises');
  }

  getID(id: number) {
    return this.http.get(environment.apiUrl + '/exercise/getExercise/' + id);
  }

  update(exercise: Exercise) {
    return this.http.post(environment.apiUrl + '/exercise/updateExercise', exercise);
  }

  save(exercise: Exercise) {
    return this.http.put(environment.apiUrl + '/exercise/saveExercise', exercise);
  }
}
