import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../../@theme/theme.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditSubjectsComponent } from './edit-subjects/edit-subjects.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [ThemeModule, CommonModule, AdminRoutingModule, Ng2SmartTableModule],
  declarations: [AdminComponent, AddUserComponent, EditSubjectsComponent],
  exports: [AddUserComponent],
})
export class AdminModule {}
