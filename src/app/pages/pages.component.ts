import { Component, OnInit, OnChanges } from '@angular/core';

import { MENU_ITEMS, ADMIN_MENU_ITEMS } from './pages-menu';
import { NbAccessChecker } from '@nebular/security';
import { NbTokenService, NbAuthToken, NbAuthService } from '@nebular/auth';
import { first } from 'rxjs/operators';
import { NbMenuItem, NbSearchService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout (onStatusChange)="childStatusChanged($event)">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[];
  constructor(
    public accessChecker: NbAccessChecker,
    public authService: NbAuthService,
    private searchService: NbSearchService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.renderMenu();
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.router.navigate([`search/${data.term}`]);
    });
  }

  childStatusChanged(finished: boolean) {
    if (finished) {
      this.renderMenu();
    }
  }

  private renderMenu() {
    this.menu = [...MENU_ITEMS];
    this.accessChecker
      .isGranted('view', 'adminPanel')
      .pipe(first())
      .subscribe((result: boolean) => {
        if (result) {
          this.menu.push(...ADMIN_MENU_ITEMS);
        }
      });
  }
}
