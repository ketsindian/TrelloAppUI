import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ROOT_URL } from '../services/constants';
import {IS_STUB} from '../services/constants'

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  generateUrl(inputUrl:string):string{
    if(IS_STUB)
    return ROOT_URL+inputUrl+'.json';
    return ROOT_URL+inputUrl;
  }

  log(message: string) {
    console.log(message);
  }  
}
