import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
}) 
export class CategoryService {
  private apiUrl = 'http://localhost:4000/api/';
  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders().set('Authorization', this.token);

  constructor(private http: HttpClient) {}

  post(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl + 'store-category', categoria, { headers: this.headers })
      .pipe(
        tap(_ => console.log('categoria registrado')),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }

  get(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + 'list-categories', { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrados')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as Categoria[]);
        })
      );
  }

  getId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.apiUrl + 'category/' + id, { headers: this.headers })
      .pipe(
        tap(_ => console.log('consultado')),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      );
  }

  put(id: Number, categoria: Categoria): Observable<Categoria> {
    id = categoria.id;
    return this.http.put<Categoria>(this.apiUrl + 'edit-category/' + id, categoria, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Encontrado')),
        catchError(error => {
          console.log("error al buscar");
          return of(error as Categoria);
        })
      );
  }

  delete(id: number, category: Categoria): Observable<Categoria> {
    return this.http.delete<Categoria>(this.apiUrl + 'delete-category/' + id, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Datos Eliminados')),
        catchError(error => {
          console.log("Error al eliminar");
          return of(error as Categoria);
        })
      );
  }
}
