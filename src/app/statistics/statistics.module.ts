import { NgModule } from '@angular/core';

import { StatisticsComponent } from './statistics.component';
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import {CommonModule} from "@angular/common";
import {StatisticService} from "../services/statistic.service";
import {DifficultyService} from "../services/difficulty.service";
import {ExerciseService} from "../services/exercise.service";
@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    StatisticsRoutingModule,
    FormsModule,
    ChartsModule,
    CommonModule
  ],
  providers: [StatisticService,DifficultyService, ExerciseService],
  bootstrap: [StatisticsComponent]
})
export class StatisticsModule {
}
