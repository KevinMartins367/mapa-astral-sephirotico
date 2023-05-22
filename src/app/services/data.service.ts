import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }


  // private url_server = 'https://kevinmartins367.github.io/mapa-astral-sephirotico';
  private url_server = '';

  public getJsonAngel(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.httpClient.get<any[]>(`${this.url_server}/assets/angels.json`, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  public getJsonTarot() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    const promise = new Promise((resolve, reject) => {
     this.httpClient.get(`${this.url_server}/assets/tarot.json`, httpOptions)
      .toPromise()
      .then((data: any) => {
          resolve(data[0]);
        })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
    });

    return promise;
  }

  public getJsonSephiroth(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.httpClient.get<any[]>(`${this.url_server}/assets/sephiroth.json`, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));

  }

  public getJsonCaractere_hebraico(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.httpClient.get<any[]>(`${this.url_server}/assets/caractere_hebraico.json`, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));

  }

  public getJsonOdus(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.httpClient.get<any[]>(`${this.url_server}/assets/odus.json`, httpOptions)
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
