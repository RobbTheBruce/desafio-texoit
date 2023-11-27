import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies.component';
import { ListComponent } from './pages/list/list.component';

const MoviesRoutes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(MoviesRoutes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
