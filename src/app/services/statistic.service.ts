import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Statistic} from "../models/statistic";

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

  update(statistic: Statistic) {
    return this.http.post(environment.apiUrl + '/statistic/updateStatistic', statistic);
  }

  save(statistic: Statistic) {
    return this.http.put(environment.apiUrl + '/statistic/saveStatistic', statistic);
  }
}
