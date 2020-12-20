import { NgModule } from '@angular/core';

import { TrainComponent } from './train.component';
import {TrainRoutingModule} from './train-routing.module';
import {FormsModule} from "@angular/forms";
import {ExerciseService} from "../services/exercise.service";
import {DifficultyService} from "../services/difficulty.service";
import {StatisticService} from "../services/statistic.service";

@NgModule({
  declarations: [
    TrainComponent
  ],
  imports: [
    TrainRoutingModule,
    FormsModule
  ],
  providers: [ExerciseService, DifficultyService, StatisticService],
  bootstrap: [TrainComponent]
})
export class TrainModule {
}
