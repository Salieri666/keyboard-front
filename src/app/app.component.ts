import {Component, OnInit} from '@angular/core';
import {GlobalValService} from './services/global-val.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'keyboard-front';
  isHidden = false;
  isHiddenByRoleAdmin = false;
  isHiddenByRoleUser = false;

  constructor(private globalVal: GlobalValService) {
  }

  ngOnInit(): void {
    this.globalVal.getHiddenState().subscribe(value => this.isHidden = value);
    this.globalVal.getHiddenByRoleAdmin().subscribe(value => this.isHiddenByRoleAdmin = value);
    this.globalVal.getHiddenByRoleUser().subscribe(value => this.isHiddenByRoleUser = value);
  }
}
