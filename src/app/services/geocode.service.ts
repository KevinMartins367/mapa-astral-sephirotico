import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private httpClient: HttpClient) { }


  getLatLong(end: any): Observable<any[]> {
    return this.httpClient.get<any[]>('https://api.opencagedata.com/geocode/v1/json?key=1bae3473c72846aa98a8fcc666fa5b65&q=' + end)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Manipulação de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
