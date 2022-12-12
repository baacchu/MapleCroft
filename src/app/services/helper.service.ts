import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  public getScoreColour(score: number | null, defaultColor = 'LightGray') : string {
    
    if (R.isNil(score) || Number.isNaN(score) || score > 10) {
        return defaultColor;
    }
    if(score==-1){
      return 'White';
    }
    if (score <= 2.5) {
        return '#ce181f';
    }
    if (score <= 5) {
        return '#f47721';
    }
    if (score <= 7.5) {
        return '#ffc709';
    }
    return '#d6e040';
  }

}
