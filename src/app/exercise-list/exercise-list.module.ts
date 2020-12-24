import { NgModule } from '@angular/core';

import {ExerciseListComponent} from './exercise-list.component';
import {ExerciseListRoutingModule} from './exercise-list-routing.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {StatisticService} from "../services/statistic.service";

@NgModule({
  declarations: [
    ExerciseListComponent
  ],
  imports: [
    ExerciseListRoutingModule,
    NgbDropdownModule,
    CommonModule
  ],
  providers: [StatisticService],
  bootstrap: [ExerciseListComponent]
})
export class ExerciseListModule {
}
