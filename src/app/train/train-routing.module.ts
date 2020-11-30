import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrainComponent} from './train.component';

const routes: Routes = [
  {
    path: '', component: TrainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainRoutingModule { }
