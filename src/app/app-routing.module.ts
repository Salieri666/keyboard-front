import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExercisesComponent} from './exercises/exercises.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
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
  {path: 'exercises', component: ExercisesComponent}, //втф???
  {path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
