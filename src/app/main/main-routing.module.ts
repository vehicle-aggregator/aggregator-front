import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import {MenuItemUrl} from "../shared/models/menu-item";

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
        path: MenuItemUrl.Dashboard,
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: MenuItemUrl.Users,
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: MenuItemUrl.Companies,
        loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
      },
      {
        path: MenuItemUrl.Transports,
        loadChildren: () => import('./transports/transports.module').then(m => m.TransportsModule)
      },
      {
        path: MenuItemUrl.Routes,
        loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule)
      },
      {
        path: MenuItemUrl.Trips,
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
