import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {GlobalValService} from "../services/global-val.service";

@Component({
  selector: 'app-root',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.username = localStorage.getItem("username");
      this.time = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.globalVal.getHiddenByRoleAdmin().subscribe(value => this.isHiddenByRoleAdmin = value);
      this.globalVal.getHiddenByRoleUser().subscribe(value => this.isHiddenByRoleUser = value);
    }
  }
  isHiddenByRoleAdmin=false;
  isHiddenByRoleUser=false;
  username: string = '';
  time: string;

  constructor(private auth: AuthserviceService,
              private router: Router, private globalVal: GlobalValService) {
  }
}
