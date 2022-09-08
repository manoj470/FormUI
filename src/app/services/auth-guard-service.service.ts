import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate{

  isLogin:boolean=false;
  constructor(private _router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(route);
    console.log(state);
    if(this.isLogin){
      return true;
    }else{
      return false;
    }
    throw new Error('Method not implemented.');
  }
}
