import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbTokenService, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  @Output() onStatusChange = new EventEmitter<boolean>();

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private tokenService: NbTokenService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => (this.user = users.nick));
    this.menuService.onItemClick().subscribe(event => {
      this.onItemSelection(event.item.title);
    });
  }

  onItemSelection(title) {
    if (title === 'Log out') {
      this.tokenService.clear();
      this.onStatusChange.emit(true);
      this.router.navigate(['/']);
    } else if (title === 'Profile') {
      this.router.navigate(['/myProfile']);
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
