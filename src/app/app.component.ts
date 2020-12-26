import {Component, OnInit} from '@angular/core';
import {GlobalValService} from './services/global-val.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'keyboard-front';
  isHidden = false;
  isHiddenByRoleAdmin = false;
  isHiddenByRoleUser = false;

  constructor(private globalVal: GlobalValService) {
  }

  ngDoCheck(){
    if (localStorage.getItem("token") != undefined) {
      if (localStorage.getItem("userRole") === 'ADMIN') {
        this.globalVal.setHiddenByRoleAdmin(true);
        this.globalVal.setHiddenByRoleUser(false);
        this.globalVal.setHiddenState(true);
      } else if (localStorage.getItem("userRole") === 'USER') {
        this.globalVal.setHiddenByRoleAdmin(false);
        this.globalVal.setHiddenByRoleUser(true);
        this.globalVal.setHiddenState(true);
      }
    }
  }
  ngOnInit() {
    this.globalVal.getHiddenState().subscribe(value => this.isHidden = value);
    this.globalVal.getHiddenByRoleAdmin().subscribe(value => this.isHiddenByRoleAdmin = value);
    this.globalVal.getHiddenByRoleUser().subscribe(value => this.isHiddenByRoleUser = value);
  }
}
