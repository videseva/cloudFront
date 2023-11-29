import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  private apiUrl = 'http://localhost:4000/api/';
  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders().set('Authorization', this.token);
  constructor(private http: HttpClient) { }

  post(reserve: reserva): Observable<reserva> {
    return this.http.post<reserva>(this.apiUrl + 'store-reserver', reserve, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Reserva registrada')),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }


  get(): Observable<reserva[]> {
    return this.http.get<reserva[]>(this.apiUrl + 'list-reserver', { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrados')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as reserva[]);
        })
      );
  }

  getId(id: number): Observable<reserva>{
    return this.http.get<reserva>(this.apiUrl + 'reserver/'+id,{ headers: this.headers })
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log(error)
        return of(error )
      })
    );
  }

  putStates(id: Number, estado: number): Observable<String> {
    return this.http.put<string>(this.apiUrl + 'edit-statesReserver/' + id, {estado: estado}, { headers: this.headers })
    .pipe(
      tap(_ => console.log('Reserva registrada')),
      catchError(error => {
        console.log(error);
        return of(error);
      })
    );
  }


  put(id: Number, reserva : reserva):Observable <reserva> {
    id =reserva.id;
    return this.http.put<reserva>(this.apiUrl +'edit-reserver/'+id, reserva,{ headers: this.headers }).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as reserva)
      })
      );
  }

  delete(id: number,reserva: reserva): Observable<reserva> {
    return this.http.delete<reserva>(this.apiUrl + 'delete-reserver/' + id,{ headers: this.headers }).pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as reserva);
      })
    );
  }

}
