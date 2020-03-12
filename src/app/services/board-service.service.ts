import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Board } from './../models/board';
import { HelperService } from './helper.service';
import { User } from '../models/user';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class BoardServiceService {

  constructor(private http: HttpClient,private helperService:HelperService) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.helperService.generateUrl('board')).pipe(
      tap(_ => this.helperService.log('Fetched Boards')),
      catchError(this.helperService.handleError('getBoards', []))
    );
  }

  getBoard(board_id: string): Observable<Board> {
    return this.http.get<Board>(this.helperService.generateUrl(`board/${board_id}`)).pipe(
      tap(_ => this.helperService.log(`Fetched Board: id=${board_id}`)),
      catchError(this.helperService.handleError<Board>(`getBoard id=${board_id}`))
    );
  }

  getSharedUsersForBoard(board_id:string):Observable<User[]>{
    return this.http.get<User[]>(this.helperService.generateUrl(`board/${board_id}/sharedUsers`)).pipe(
      tap(_ => this.helperService.log(`Fetched Board Shared Users for : id=${board_id}`)),
      catchError(this.helperService.handleError<User[]>(`getSharedUsersForBoard id=${board_id}`))
    );
  }

  getUnSharedUsersForBoard(board_id:string):Observable<User[]>{
    return this.http.get<User[]>(this.helperService.generateUrl(`board/${board_id}/unsharedUsers`)).pipe(
      tap(_ => this.helperService.log(`Fetched Board UnShared Users for : id=${board_id}`)),
      catchError(this.helperService.handleError<User[]>(`getUnSharedUsersForBoard id=${board_id}`))
    );
  }

  sharedBoard(board:Board):Observable<Board>{
    return this.http.post<Board>(this.helperService.generateUrl(`board/${board.board_id}/shareBoard`),board,httpOptions).pipe(
      tap(_ => this.helperService.log(`board ${board.board_id} shared to user: ${board.secondary_user_id} `)),
      catchError(this.helperService.handleError<Board>(`sharedBoard id=${board.board_id}`))
    );
  }

  unSharedBoard(board:Board):Observable<Board>{
    return this.http.post<Board>(this.helperService.generateUrl(`board/${board.board_id}/unShareBoard`),board,httpOptions).pipe(
      tap(_ => this.helperService.log(`board ${board.board_id} shared to user: ${board.secondary_user_id} `)),
      catchError(this.helperService.handleError<Board>(`sharedBoard id=${board.board_id}`))
    );
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.helperService.generateUrl(`board`), board, httpOptions).pipe(
      tap((board: Board) => this.helperService.log(`Added Board w/ name=${board.board_name}`)),
      catchError(this.helperService.handleError<Board>('addBoard'))
    );
  }

  updateBoard(board: Board): Observable<Board> {
    return this.http.put<Board>(this.helperService.generateUrl(`board/${board.board_id}`), board, httpOptions).pipe(
      tap(_ => this.helperService.log(`Updated Board: name=${board.board_name}`)),
      catchError(this.helperService.handleError<Board>(`updateBoard name=${board.board_name}`))
    );
  }

  deleteBoard(board: Board): Observable<Board> {
    return this.http.delete<Board>(this.helperService.generateUrl(`board/${board.board_id}`), httpOptions).pipe(
      tap(_ => this.helperService.log(`Deleted Board: name=${board.board_name}`)),
      catchError(this.helperService.handleError<Board>(`deleteBoard name=${board.board_id}`))
    );
  }

  getFromTrello(board_id:string){
    return this.http.get<Board>(this.helperService.generateUrl(`fetchboard/${board_id}`)).pipe(
      tap(_ => this.helperService.log(`Fetched Board from trello: id=${board_id}`)),
      catchError(this.helperService.handleError<Board>(`getFromTrello id=${board_id}`))
    );
  }

}
