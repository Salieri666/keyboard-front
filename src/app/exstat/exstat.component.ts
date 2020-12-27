import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ExerciseService} from "../services/exercise.service";
import {StatisticService} from "../services/statistic.service";
import {Statistic} from "../models/statistic";
import {Info} from "../auth/Info";
import {UserService} from "../services/user.service";
import {Exercise} from "../models/exercise";
import {DifficultyService} from "../services/difficulty.service";
import {Difficulty} from "../models/difficulty";

@Component({
  selector: 'app-root',
  templateUrl: './exstat.component.html',
  styleUrls: ['./exstat.component.scss']
})
export class ExStatComponent implements OnInit {
  id: number;
  exStat: Statistic[] = [];
  usersCompleted: string[] = [];
  usersFailed: string[] = [];
  exercise: Exercise = new Exercise();
  executionCount: number = 0;
  failCount: number = 0;
  exDiff: Difficulty = new Difficulty();

  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpExService.getID(this.id).subscribe((data: Exercise) => {
        this.exercise = data;
        this.executionCount = 0;
        this.failCount = 0;
        this.httpDifService.getID(this.exercise.levelId).subscribe((data: Difficulty) => {
          this.exDiff = data;
        })
        this.httpStatService.getAll().subscribe((data: Statistic[]) => {
          this.exStat = data.filter(stat => stat.exerciseId == this.id);
          this.httpUserService.getAll().subscribe((data: Info[]) => {
            for (let stat of this.exStat) {
              this.failCount += stat.numberOfFailures;
              this.executionCount += stat.numberOfExecutions - stat.numberOfFailures;
              if (stat.numberOfFailures < stat.numberOfExecutions)
                this.usersCompleted.push(data.filter(user => parseInt(user.id) == stat.userId)[0].username);
              else this.usersFailed.push(data.filter(user => parseInt(user.id) == stat.userId)[0].username);
            }
          });
        });
      });

    }
  }

  constructor(private auth: AuthserviceService, private httpDifService: DifficultyService, private httpUserService: UserService, private httpExService: ExerciseService, private httpStatService: StatisticService, private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
}
