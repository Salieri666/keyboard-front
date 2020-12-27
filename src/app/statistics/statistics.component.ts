import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color} from 'ng2-charts';
import {AuthserviceService} from '../auth/authservice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StatisticService} from "../services/statistic.service";
import {Statistic} from "../models/statistic";
import {DifficultyService} from "../services/difficulty.service";
import {Difficulty} from "../models/difficulty";
import {ExerciseService} from "../services/exercise.service";
import {Exercise} from "../models/exercise";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

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
      this.getStat();
    }
  }

  constructor(private auth: AuthserviceService,private httpUserService:UserService, private httpStatService: StatisticService, private httpDifService: DifficultyService,
              private httpExService: ExerciseService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id=activatedRoute.snapshot.params['id'];
  }
  id:number;
  login = "";
  exCompl = 0;
  wins = 0;
  fails = 0;
  allTimeErr = 0;
  allStat: Statistic[] = [];
  difficulties: Difficulty[] = [];
  completeExercises: string[];
  failedExercises: string[];
  avgSpeedArr: number[] = [];
  maxSpeedArr: number[] = [];
  allUserExercises: Exercise[] = [];
  exercisesIds: string[] = [];

  getStat() {
    this.httpStatService.getByUserID(this.id).subscribe((data: Statistic[]) => {
      this.allStat = data;
      this.httpUserService.getById(this.id).subscribe((data:User)=>{
        this.login=data.username;
      })
      this.httpDifService.getAll().subscribe((data: Difficulty[]) => {
        this.difficulties = data;
        this.exCompl = 0;
        this.wins = 0;
        this.fails = 0;
        this.allTimeErr = 0;
        this.completeExercises = [];
        this.failedExercises = [];
        this.httpExService.getByUserID(this.id).subscribe((data: Exercise[]) => {
          this.allUserExercises = data;
          for (let stat of this.allStat) {
            this.exCompl += stat.numberOfExecutions;
            this.allTimeErr += stat.errors;
            this.fails += stat.numberOfFailures;
            if (stat.numberOfFailures < stat.numberOfExecutions) {
              this.completeExercises.push('Название: '+ data.filter(ex=>ex.id==stat.exerciseId)[0].name + ' | Сложность: ' + this.difficulties.filter(dif => dif.id ==
                this.allUserExercises.filter(ex => ex.id == stat.exerciseId)[0].levelId)[0].name);
            } else {
              this.failedExercises.push('Название: '+data.filter(ex=>ex.id==stat.exerciseId)[0].name + ' | Сложность: ' + this.difficulties.filter(dif => dif.id ==
                this.allUserExercises.filter(ex => ex.id == stat.exerciseId)[0].levelId)[0].name);
            }
            this.avgSpeedArr.push(stat.avgSpeed);
            this.maxSpeedArr.push(stat.maxSpeed);
            this.exercisesIds.push(data.filter(ex=>ex.id==stat.exerciseId)[0].name + ' (' + this.difficulties.filter(dif => dif.id ==
              this.allUserExercises.filter(ex => ex.id == stat.exerciseId)[0].levelId)[0].name + ')');
            this.wins = this.exCompl - this.fails;
          }
        });
      });

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
