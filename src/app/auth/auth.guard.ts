import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, 
              private store: Store<fromApp.AppState>){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
   {
    return this.store.select('auth').pipe(take(1),
    map(authState => authState.user), 
    map( (user) => {
      const isAuth = !!user;
      if(isAuth){
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }))
  }
}
