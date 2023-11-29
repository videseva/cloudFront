import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api/';
  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders().set('Authorization', this.token);
  constructor(private http: HttpClient) { }

  post(user : usuario): Observable<any>{
    return this.http.post<usuario>(this.apiUrl+ 'store-user', user,{ headers: this.headers })
    .pipe(
      tap(_ => console.log('Usuario registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

 
  get(): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.apiUrl + 'list-user', { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrados')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as usuario[]);
        })
      );
  }

  getId(id: number): Observable<usuario> {
    return this.http.get<usuario>(this.apiUrl + 'user/' + id, { headers: this.headers })
      .pipe(
        tap(_ => console.log('consultado')),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }

  


  put(id: Number, usuario : usuario):Observable <usuario> {
    id =usuario.id;
    return this.http.put<usuario>(this.apiUrl +'edit-user/'+id,usuario,{ headers: this.headers }).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as usuario)
      })
      );
  }
  delete(id: number, user:usuario): Observable<usuario> {
    return this.http.delete<usuario>(this.apiUrl + 'delete-user/' + id,{ headers: this.headers })
    .pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as usuario);
      })
    );
  }
  


}
