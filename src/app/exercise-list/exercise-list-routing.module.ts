import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExerciseListComponent} from './exercise-list.component';

const routes: Routes = [
  {
    path: '', component: ExerciseListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseListRoutingModule { }
