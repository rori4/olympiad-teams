import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditSubjectsComponent } from './edit-subjects/edit-subjects.component';
import { AdminGuard } from '../../@core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'user/edit/:id',
        component: AddUserComponent,
      },
      {
        path: 'edit-subjects',
        component: EditSubjectsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
