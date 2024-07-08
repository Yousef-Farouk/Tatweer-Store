import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';


@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  

  constructor(protected http: HttpClient, @Inject(BASE_URL) protected baseUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl)
  }

  getById(itemId: number|string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${itemId}`);
  }

  addItem(item: any): Observable<T> {
    return this.http.post<T>(this.baseUrl, item).pipe(
      tap(() => this.refreshData())
    );
  }

  editItem(itemId: number, item: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${itemId}`, item).pipe(
      tap(() => this.refreshData())
    );
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${itemId}`).pipe(
      tap(() => this.refreshData())
    );
  }

  private refreshData() {
    this.getAll().subscribe();
  }
}
