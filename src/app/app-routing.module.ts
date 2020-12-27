import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {
    path: 'train/:id', loadChildren: () => import('./train/train.module').then(m => m.TrainModule)
  },
  {
    path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  {
    path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'list', loadChildren: () => import('./exercise-list/exercise-list.module').then(m => m.ExerciseListModule)
  },
  {path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule)},
  {path: 'main', loadChildren: () => import('./mainpage/mainpage.module').then(m => m.MainpageModule)},
  {path: 'exercises', loadChildren: () => import('./exercises/exercises.module').then(m => m.ExercisesModule)},
  {path: 'exstat/:id', loadChildren: () => import('./exstat/exstat.module').then(m => m.ExstatModule)},
  {path: 'users', component: UsersComponent},
  {
    path: '**', redirectTo: 'main'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
