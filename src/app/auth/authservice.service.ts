import {Injectable} from '@angular/core';
import {Info} from './Info';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {RegistrationDto} from './RegistrationDto';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) {
  }

  public login(user, pass) {
    const body = {username: user, password: pass};
    return this.http.post<Info>(environment.apiUrl + '/api/login', body).pipe(
      catchError(err => {
        return throwError(err);
      }));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  public get islogin(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public registration(regDto: RegistrationDto) {
    return this.http.post(environment.apiUrl + '/api/registration', regDto).pipe(
      catchError(err => {
        return throwError(err);
      }));
  }
}
