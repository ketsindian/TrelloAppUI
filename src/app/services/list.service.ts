import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { List } from './../models/list';
import { HelperService } from './helper.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient,private helperService:HelperService) { }

  getLists(board_id: number): Observable<List[]> {
    return this.http.get<List[]>(this.helperService.generateUrl(`board/${board_id}/list`)).pipe(
      tap(_ => this.helperService.log('Fetched Board Lists')),
      catchError(this.helperService.handleError('getLists', []))
    );
  }

  getListbyId(board_id: number,list_id: string): Observable<List[]> {
    return this.http.get<List[]>(this.helperService.generateUrl(`board/${board_id}/list/${list_id}`)).pipe(
      tap(_ => this.helperService.log('Fetched Board Lists')),
      catchError(this.helperService.handleError('getLists', []))
    );
  }

  addList(board_id: number,list: List): Observable<List> {
    return this.http.post<List>(this.helperService.generateUrl(`board/${board_id}/list`), list, httpOptions).pipe(
      tap((list: List) => this.helperService.log(`Added List w/ name=${list.list_name}`)),
      catchError(this.helperService.handleError<List>('addList'))
    );
  }

  updateList(board_id: number,list: List): Observable<List> {
    return this.http.put<List>(this.helperService.generateUrl(`board/${board_id}/list/${list.list_id}`), list, httpOptions).pipe(
      tap(_ => this.helperService.log(`Updated List: name=${list.list_name}`)),
      catchError(this.helperService.handleError<List>(`updateList name=${list.list_name}`))
    );
  }

  deleteList(board_id: number,list: List): Observable<List> {
    return this.http.delete<List>(this.helperService.generateUrl(`board/${board_id}/list/${list.list_id}`), httpOptions).pipe(
      tap(_ => this.helperService.log(`Deleted List: name=${list.list_name}`)),
      catchError(this.helperService.handleError<List>(`deleteList name=${list.list_name}`))
    );
  }
}
