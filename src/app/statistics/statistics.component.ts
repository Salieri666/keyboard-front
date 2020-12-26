import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color} from 'ng2-charts';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {StatisticService} from "../services/statistic.service";
import {Statistic} from "../models/statistic";
import {DifficultyService} from "../services/difficulty.service";
import {Difficulty} from "../models/difficulty";
import {ExerciseService} from "../services/exercise.service";
import {Exercise} from "../models/exercise";

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

  constructor(private auth: AuthserviceService, private httpStatService: StatisticService, private httpDifService: DifficultyService,
              private httpExService: ExerciseService, private router: Router) {
  }

  login = "";
  exCompl = 0;
  wins = 0;
  fails = 0;
  allTimeErr = 0;
  allStat: Statistic[] = [];
  difficulties: Difficulty[] = [];
  completeExercises: number[];
  failedExercises: number[];
  avgSpeedArr: number[] = [];
  maxSpeedArr: number[] = [];
  exercisesIds: string[] = [];

  getStat() {
    this.httpStatService.getAll().subscribe((data: Statistic[]) => {
      this.httpDifService.getAll().subscribe((data: Difficulty[]) => this.difficulties = data);
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
        this.avgSpeedArr.push(stat.avgSpeed);
        this.maxSpeedArr.push(stat.maxSpeed);
        this.httpExService.getID(stat.exerciseId).subscribe((data: Exercise) => {
          this.exercisesIds.push(stat.exerciseId.toString() + ' (' + this.difficulties[data.levelId-1].name + ')');
        })

      }
      this.wins = this.exCompl - this.fails;
    });

  }

  public lineChartData: ChartDataSets[] = [
    {data: this.avgSpeedArr, label: 'Статистика средней скорости по упражнениям'},
    {data: this.maxSpeedArr, label: 'Статистика максимальной скорости по упражнениям'}
  ];
  public lineChartLabels: string[] = this.exercisesIds;
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

}
