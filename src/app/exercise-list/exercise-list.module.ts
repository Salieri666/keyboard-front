import { NgModule } from '@angular/core';

import {ExerciseListComponent} from "./exercise-list.component";
import {ExerciseListRoutingModule} from "./exercise-list-routing.module";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ExerciseListComponent
  ],
  imports: [
    ExerciseListRoutingModule,
    NgbDropdownModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [ExerciseListComponent]
})
export class ExerciseListModule {
}
