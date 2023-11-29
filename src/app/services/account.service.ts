import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cuenta } from '../models/cuenta';
import { Observable, catchError, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:4000/api/';
  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders().set('Authorization', this.token);
  constructor(private http: HttpClient) { }

  post(cuenta : any): Observable<any>{
    return this.http.post<any>(this.apiUrl+ 'store-account', cuenta)
    .pipe(
      tap(_ => console.log('cuenta registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  getId(): Observable<cuenta> {
    return this.http.get<cuenta>(this.apiUrl + 'account' , { headers: this.headers })
      .pipe(
        tap(_ => console.log('consultado')),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }

  

  get(): Observable<cuenta[]> {
    return this.http.get<cuenta[]>(this.apiUrl + 'list-account', { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrados')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as cuenta[]);
        })
      );
  }

 




}
