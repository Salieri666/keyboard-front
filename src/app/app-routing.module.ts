import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrainComponent} from './train/train.component';

const routes: Routes = [
  {
    path: 'train', component: TrainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
