import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [ThemeModule, CommonModule, AdminRoutingModule],
  declarations: [AdminComponent, AddStudentComponent],
})
export class AdminModule {}
