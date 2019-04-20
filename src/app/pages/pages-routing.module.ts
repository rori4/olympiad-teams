import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddUserComponent } from './admin/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
      },
      {
        path: 'students',
        component: StudentsTableComponent,
      },
      {
        path: 'students/:subject',
        component: StudentsTableComponent,
      },
      {
        path: 'search/:search',
        component: StudentsTableComponent,
      },
      {
        path: 'profile/:id',
        component: UserProfileComponent,
      },
      {
        path: 'myProfile',
        component: AddUserComponent,
      },
      {
        path: 'dashboard',
        component: ECommerceComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
