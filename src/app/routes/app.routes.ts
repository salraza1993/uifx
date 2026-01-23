import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/home/home').then(m => m.Home)
  },
  {
    path: 'elements',
    loadComponent: () => import('@pages/elements/elements').then(m => m.Elements)
  },
  {
    path: 'components/tabs',
    loadComponent: () => import('@app/pages/components/tabs/tabs').then(m => m.Tabs)
  },
  {
    path: 'components/buttons',
    loadComponent: () => import('@app/pages/components/buttons/buttons').then(m => m.Buttons)
  },
  {
    path: 'components/modals',
    loadComponent: () => import('@app/pages/components/modals/modals').then(m => m.Modals)
  },
  {
    path: 'components/typography',
    loadComponent: () =>
      import('@app/pages/components/typography/typography').then(m => m.Typography)
  },
  {
    path: 'components/cards',
    loadComponent: () => import('@app/pages/components/cards/cards').then(m => m.Cards)
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found').then(m => m.NotFound)
  }
];
