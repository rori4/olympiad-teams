import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAccessChecker } from '@nebular/security';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(public accessChecker: NbAccessChecker, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accessChecker.isGranted('view', 'adminPanel').pipe(
      tap(admin => {
        if (!admin) {
          this.router.navigate(['auth/login']);
        }
      }),
    );
  }
}
