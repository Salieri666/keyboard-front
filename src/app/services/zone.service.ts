import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Zone} from "../models/zone";
import {Injectable} from "@angular/core";
@Injectable()
export class ZoneService {
  constructor(private http: HttpClient) {
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/zone/deleteZone/' + id);
  }

  getAll() {
    return this.http.get(environment.apiUrl + '/zone/getAllZones');
  }

  getID(id: number) {
    return this.http.get(environment.apiUrl + '/zone/getZone/' + id);
  }

  update(zone: Zone) {
    return this.http.post(environment.apiUrl + '/zone/updateZone', zone);
  }

  save(zone: Zone) {
    return this.http.put(environment.apiUrl + '/zone/saveZone', zone);
  }
}
