import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'movies', loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule)
    },
    {
        path: '', loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule)
    },
];
