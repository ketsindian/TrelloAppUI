import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Card } from '../models/card';
import { HelperService } from './helper.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient, private helperService : HelperService) { }

  getCards(boardId:number,listID: string): Observable<Card[]> {
    return this.http.get<Card[]>(this.helperService.generateUrl(`/board/${boardId}/list/${listID}/card`)).pipe(
      tap(_ => this.helperService.log(`Fetched cards list`)),
      catchError(this.helperService.handleError('addCards',[]))
    );
  }
  addCard(boardId:number,listID: string, card: Card): Observable<Card> {
    return this.http.post<Card>(this.helperService.generateUrl(`/board/${boardId}/list/${listID}/card`),  card , httpOptions).pipe(
      tap((card: Card) => this.helperService.log(`Added Card w/ name=${card.card_name}`)),
      catchError(this.helperService.handleError<Card>('addCard'))
    );
  }

  updateCard(boardId:number,listID: string, card: Card): Observable<Card> {
    return this.http.put<Card>(this.helperService.generateUrl(`/board/${boardId}/list/${listID}/card/${card.card_id}`),card, httpOptions).pipe(
      tap(_ => this.helperService.log(`Updated List: name=${card.card_name}`)),
      catchError(this.helperService.handleError<Card>(`updateList name=${card.card_name}`))
    );
  }

  deleteCard(boardId:number,listID: string, card:Card): Observable<Card> {
    return this.http.delete<Card>(this.helperService.generateUrl(`/board/${boardId}/list/${listID}/card/${card.card_id}`),httpOptions).pipe(
      tap(_ => this.helperService.log(`Deleted Card: name=${card.card_id}`)),
      catchError(this.helperService.handleError<Card>(`deleteCard name=${card.card_id}`))
    );
  }
  
}
