import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { List } from './../models/list';
import { HelperService } from './helper.service';
import { LoginRequest } from '../models/loginRequest';
import { LoginResponse } from '../models/loginResponse';
import { Router } from '@angular/router';

export const TOKEN_NAME: string = 'jwt_token';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private helperService:HelperService,private router :Router) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  login(loginRequest:LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.helperService.generateUrl(`auth/signin`), loginRequest, httpOptions).pipe(
      tap((loginResponse: LoginResponse) => this.setToken(loginResponse.jwtToken))
    );
  }

  logout(){
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/home']);
  }
}
