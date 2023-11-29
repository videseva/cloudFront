import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { zonaComun } from '../models/zonacomun';

@Injectable({
  providedIn: 'root'
})
export class ZoneCommonService {
  private apiUrl = 'http://localhost:4000/api/';
  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders().set('Authorization', this.token);
  constructor(private http: HttpClient) { }

  post(zone: zonaComun): Observable<zonaComun> {
    return this.http.post<zonaComun>(this.apiUrl + 'store-zone', zone, { headers: this.headers })
      .pipe(
        tap(_ => console.log('zona registrado')),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }


  get(): Observable<zonaComun[]> {
    return this.http.get<zonaComun[]>(this.apiUrl + 'list-zone', { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrados')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as zonaComun[]);
        })
      );
  }
  getId(id: number): Observable<zonaComun>{
    return this.http.get<zonaComun>(this.apiUrl + 'zone/'+id,{ headers: this.headers })
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log(error)
        return of(error )
      })
    );
  }


  put(id: Number, zonaComun: zonaComun): Observable<zonaComun> {
    id = zonaComun.id;
    return this.http.put<zonaComun>(this.apiUrl + 'edit-zone/' + id, zonaComun, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrado')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as zonaComun);
        })
      );
  }

  delete(id: number, zonaComun: zonaComun): Observable<zonaComun> {
    return this.http.delete<zonaComun>(this.apiUrl + 'delete-zone/' + id, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Eliminados')),
        catchError(error => {
          console.log("Error al eliminar");
          return of(error as zonaComun);
        })
      );
  }



}
