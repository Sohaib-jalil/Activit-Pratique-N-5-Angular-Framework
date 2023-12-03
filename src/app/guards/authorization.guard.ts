import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppStateService} from "../services/app-state.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class authorizationGuard {
  constructor(private appState:AppStateService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appState.authState.isAuthenticated) {
      if (this.appState.authState.roles.includes(route.data['requiredRoles'])) {
        return true;
      } else {
        this.router.navigateByUrl('/admin/notAuthorized');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
