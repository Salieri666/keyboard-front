import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.login = localStorage.getItem('username');
    }
  }

  constructor(private auth: AuthserviceService,
              private router: Router) {
  }

  login = 'user.nologin';
  exCompl = 10;
  winFail = 0.96;
  allTimeErr = 5;

  public lineChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Упражнений в день'},
  ];
  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7'];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public chartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
  public exerciseW = ['1', '2', '3', '4', '5', '6', '7'];
  public exerciseF = ['1', '2', '3', '4', '5', '6', '7'];
}
