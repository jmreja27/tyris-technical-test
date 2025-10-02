import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: MovieGridComponent },
  { path: 'movie/:title', component: MovieDetailComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
