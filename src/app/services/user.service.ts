import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './../models/user';
import { HelperService } from './helper.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private helperService:HelperService) { }

  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.helperService.generateUrl(`user`),httpOptions).pipe(
      tap(_ => this.helperService.log('Fetched All Users')),
      catchError(this.helperService.handleError('Users', []))
    );
  }

  getUserByBoardId(board_id: number): Observable<User[]> {
    return this.http.get<User[]>(this.helperService.generateUrl(`board/${board_id}/user`),httpOptions).pipe(
      tap(_ => this.helperService.log('Fetched Users for Board')),
      catchError(this.helperService.handleError('getUserByBoardId', []))
    );
  }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(this.helperService.generateUrl(`auth/signup`), user, httpOptions).pipe(
      tap((user: User) => this.helperService.log(`Added User with id =${user.email_id}`)),
      catchError(this.helperService.handleError<User>('addUser'))
    );
  }

}
