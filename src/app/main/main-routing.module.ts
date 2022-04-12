import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'my-account',
        loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule)
      },
      {
        path: 'my-company',
        loadChildren: () => import('./my-organisation/my-organisation.module').then(m => m.MyOrganisationModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'transports',
        loadChildren: () => import('./transports/transports.module').then(m => m.TransportsModule)
      },
      {
        path: 'routes',
        loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('./trips/trips.module').then(m => m.TripsModule)
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
