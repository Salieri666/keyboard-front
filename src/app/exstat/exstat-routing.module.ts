import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExStatComponent} from "./exstat.component";

const routes: Routes = [
  {
    path: '', component: ExStatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExStatRoutingModule { }
