import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { StudentsTableComponent } from './students-table/students-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminModule } from './admin/admin.module';

const PAGES_COMPONENTS = [
  PagesComponent,
  StudentsTableComponent,
  UserProfileComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    AdminModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
