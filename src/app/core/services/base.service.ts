import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from '../models/result-response';

@Injectable({
  providedIn: 'root',
  useFactory: () => true
})

export class BaseService<T> {

  constructor(protected http: HttpClient, private API_URL: any) { }

  getAll(params: HttpParams = new HttpParams()): Observable<ResultResponse<T[]>> {
    return this.http.get<ResultResponse<T[]>>(this.API_URL, { params });
  }

  getById(id: string | undefined): Observable<ResultResponse<T>> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<ResultResponse<T>>(url);
  }

  create(item: any): Observable<ResultResponse<T>> {
    return this.http.post<ResultResponse<T>>(this.API_URL, item);
  }

  update(id: string, item: any): Observable<ResultResponse<T>> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<ResultResponse<T>>(url, item);
  }

  delete(id: string): Observable<ResultResponse<T>> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<ResultResponse<T>>(url);
  }
}