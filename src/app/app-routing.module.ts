import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'train', loadChildren: () => import('./train/train.module').then(m => m.TrainModule)
  },
  {
    path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  {
    path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
