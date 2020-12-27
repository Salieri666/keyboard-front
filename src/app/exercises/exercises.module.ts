import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ExercisesComponent} from "./exercises.component";
import {ExercisesRoutingModule} from "./exercises-routing.module";
import {NgbDropdownModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {ExerciseService} from "../services/exercise.service";
import {DifficultyService} from "../services/difficulty.service";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ExercisesComponent
  ],
  imports: [
    ExercisesRoutingModule,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbDropdownModule
  ],
  providers: [ExerciseService, DifficultyService],
  bootstrap: [ExercisesComponent]
})
export class ExercisesModule {
}
