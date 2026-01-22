import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/home/home').then((m) => m.Home),
  },
  {
    path: 'elements',
    loadComponent: () => import('@pages/elements/elements').then((m) => m.Elements),
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found').then((m) => m.NotFound),
  }
];
