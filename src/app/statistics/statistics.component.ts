import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {StatisticService} from "../services/statistic.service";
import {Statistic} from "../models/statistic";

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
      this.getStat();
    }
  }

  constructor(private auth: AuthserviceService, private httpStatService: StatisticService,
              private router: Router) {
  }

  login = "";
  exCompl = 0;
  wins = 0;
  fails = 0;
  allTimeErr = 0;
  allStat: Statistic[] = [];
  completeExercises: number[];
  failedExercises: number[];

  getStat() {
    this.httpStatService.getAll().subscribe((data: Statistic[]) => {
      this.allStat = data.filter(statistic => statistic.userId === parseInt(localStorage.getItem("userId")));
      this.exCompl = 0;
      this.wins = 0;
      this.fails = 0;
      this.allTimeErr = 0;
      this.completeExercises = [];
      this.failedExercises = [];
      for (let stat of this.allStat) {
        this.exCompl += stat.numberOfExecutions;
        this.allTimeErr += stat.errors;
        this.fails += stat.numberOfFailures;
        if (stat.numberOfFailures < stat.numberOfExecutions) {
          this.completeExercises.push(stat.exerciseId);
        } else {
          this.failedExercises.push(stat.exerciseId);
        }
      }
      this.wins = this.exCompl - this.fails;
    });

  }

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

}
