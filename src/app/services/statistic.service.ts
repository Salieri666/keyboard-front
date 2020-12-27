import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Statistic} from "../models/statistic";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable()
export class StatisticService {
  constructor(private http: HttpClient) {
  }
  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/statistic/deleteStatistic/' + id);
  }

  getAll() {
    return this.http.get(environment.apiUrl + '/statistic/getAllStatistics');
  }

  getID(id: number) {
    return this.http.get(environment.apiUrl + '/statistic/getStatistic/' + id);
  }
  getByUserID(id: number) {
    return this.http.get(environment.apiUrl + '/statistic/getStatisticByUser/' + id);
  }
  getByExId(id:number){
    return this.http.get(environment.apiUrl + '/statistic/getStatisticByExercise/' + id);
  }

  update(statistic: Statistic) {
    return this.http.post(environment.apiUrl + '/statistic/updateStatistic', statistic);
  }

  save(statistic: Statistic) {
    return this.http.put(environment.apiUrl + '/statistic/saveStatistic', statistic);
  }
}
