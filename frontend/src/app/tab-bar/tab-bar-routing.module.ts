import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBarPage } from './tab-bar.page';

const routes: Routes = [
  {
    path: '',
    component: TabBarPage,
    children: [
      {
          path: 'dashboard',
          loadChildren: () => import('../components/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'scan',
        loadChildren: () => import('../components/scan/scan.module').then( m => m.ScanPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../components/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path:'',
        redirectTo: '/tab-bar/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBarPageRoutingModule {}
