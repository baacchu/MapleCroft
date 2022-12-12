import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class GeoDataServiceService  implements OnDestroy {

  public jsonDataRoot = './assets/';

  constructor(private http: HttpClient) { }

  public getCountriesData(): Observable<any> {
    let fullPath = this.jsonDataRoot + 'ne_110m_admin_0_countries.json';
    return this.http
      .get<any>(fullPath)
      .pipe(map(response => response),
        catchError(this.handleError<any>('getCountriesData'))
      )

  }

  public getCountriesScoreData(): Observable<any> {
    let fullPath = this.jsonDataRoot + 'data.json';
    return this.http
      .get<any>(fullPath)
      .pipe(map(response => response),
        catchError(this.handleError<any>('getCountriesScoreData'))
      )

  }
  

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error); // log to console instead
      // If a native error is caught, do not transform it. We only want to
      // transform response errors that are not wrapped in an `Error`.
      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };

  }

  ngOnDestroy(): void {
    if (this.http) {
      this.http = null;
    }
  }
}
