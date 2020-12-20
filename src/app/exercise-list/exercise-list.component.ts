import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {ExerciseService} from '../services/exercise.service';
import {DifficultyService} from '../services/difficulty.service';
import {Exercise} from '../models/exercise';
import {Difficulty} from '../models/difficulty';

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

  constructor(private httpExService: ExerciseService, private httpDifService: DifficultyService, private auth: AuthserviceService,
              public router: Router) {
  }

  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpExService.getAll().subscribe((data: Exercise[]) => {
        this.exercises = data;
        this.filtered = data;
      });
      this.httpDifService.getAll().subscribe((data: Difficulty[]) => this.difficulties = data);
    }
  }

  filter(id: number) {
    this.filtered = this.exercises.filter(exercise => exercise.levelId === id);
  }
}
