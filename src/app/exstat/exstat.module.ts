import { NgModule } from '@angular/core';
import {ExStatComponent} from "./exstat.component";
import {ExStatRoutingModule} from "./exstat-routing.module";
import {StatisticService} from "../services/statistic.service";
import {ExerciseService} from "../services/exercise.service";
import {UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";
import {DifficultyService} from "../services/difficulty.service";


@NgModule({
  declarations: [
    ExStatComponent
  ],
  imports: [
    ExStatRoutingModule,
    CommonModule
  ],
  providers: [StatisticService, ExerciseService, UserService, DifficultyService],
  bootstrap: [ExStatComponent]
})
export class ExstatModule {
}
