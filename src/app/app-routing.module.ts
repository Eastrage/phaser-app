import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameScene} from 'src/modules/letters-fall/scenes/game.scene';
import {RouteGroup} from 'src/models';
import {AppComponent} from './app.component';
import {LettersFallComponent} from 'src/modules/letters-fall/letters-fall.component';
import {DashboardComponent} from 'src/modules/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'apps',
    pathMatch: 'full'
  },
  {
    path: 'apps',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'letters/:word',
    component: LettersFallComponent,
    pathMatch: 'full',
  },
  {
    path: 'letters',
    component: LettersFallComponent,
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
