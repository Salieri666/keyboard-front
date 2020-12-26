import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {ExerciseService} from '../services/exercise.service';
import {DifficultyService} from '../services/difficulty.service';
import {Exercise} from '../models/exercise';
import {Difficulty} from '../models/difficulty';
import {Statistic} from "../models/statistic";
import {StatisticService} from "../services/statistic.service";

@Component({
  selector: 'app-root',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  providers: [ExerciseService, DifficultyService]
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];
  filtered: Exercise[] = [];
  difficulties: Difficulty[] = [];
  statistics: Statistic[] = [];

  constructor(private httpExService: ExerciseService, private httpDifService: DifficultyService, private auth: AuthserviceService, private httpStatService: StatisticService,
              public router: Router) {
  }

  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpDifService.getAll().subscribe((data: Difficulty[]) => {
        this.difficulties = data;
        this.httpExService.getAll().subscribe((data: Exercise[]) => {
          this.exercises = data.filter(exercise => exercise.levelId != null);
          this.filtered = this.exercises;
          if (localStorage.getItem('userLevelId') !== "null") {
            this.filter(parseInt(localStorage.getItem('userLevelId')));
          }
          this.httpStatService.getAll().subscribe((data: Statistic[]) => {
            this.statistics = data;
          })
        });
      });


    }
  }

  filter(id: number) {
    this.filtered = this.exercises.filter(exercise => exercise.levelId === id);
  }

  stat: Statistic;

  filterStat(id: number): string {
    this.stat = this.statistics.filter(statistic => statistic.exerciseId == id && statistic.userId == parseInt(localStorage.getItem('userId')))[0];
    if (this.stat != undefined && this.stat.numberOfExecutions > this.stat.numberOfFailures)
      return "Пройдено"
    else
      return "Не пройдено"
  }
}
