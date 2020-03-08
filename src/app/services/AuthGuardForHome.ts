import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardForHome implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(){
    if(!this.authService.getToken()){
        return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }

}
