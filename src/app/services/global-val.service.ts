import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalValService {
  private isHidden = new BehaviorSubject(false);
  private isHiddenByRoleAdmin = new BehaviorSubject(false);
  private isHiddenByRoleUser = new BehaviorSubject(false);

  getHiddenState(): Observable<boolean> {
    return this.isHidden;
  }

  setHiddenState(next): void {
    this.isHidden.next(next);
  }

  getHiddenByRoleAdmin(): Observable<boolean> {
    return this.isHiddenByRoleAdmin;
  }

  setHiddenByRoleAdmin(next): void {
    this.isHiddenByRoleAdmin.next(next);
  }

  getHiddenByRoleUser(): Observable<boolean> {
    return this.isHiddenByRoleUser;
  }

  setHiddenByRoleUser(next): void {
    this.isHiddenByRoleUser.next(next);
  }

  constructor() {
  }
}
