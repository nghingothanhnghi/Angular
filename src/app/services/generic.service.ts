import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  public isUrlReady: boolean;
  protected url: string;
  constructor(private httpClient: HttpClient) {

  }

  protected post(endpoint: string, item?: T | any, customHeader?: HttpHeaders): Observable<any | T> {
    return this.httpClient.post<T>(`${this.url}/${endpoint}`, item, {
      headers: customHeader
    });
  }

  protected put(endpoint: string, item?: T | any, customHeader?: HttpHeaders): Observable<any | T> {
    return this.httpClient.put<T>(`${this.url}/${endpoint}`, item, {
      headers: customHeader
    });
  }

  protected get(endpoint: string, params?: number | string | HttpParams, headers?: HttpHeaders): Observable<any | T> {
    let req;
    if (params instanceof HttpParams) {
      req = this.httpClient.get<T>(`${this.url}/${endpoint}`, {
        params,
        headers
      });
    } else {
      req = this.httpClient.get<T>(`${this.url}/${endpoint}${params ? `/${params}` : ``}`, {
        headers
      });
    }

    return req;
    // return req.pipe(
    //   retry(1)
    // );
  }

  protected getList(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${endpoint}`, {
      params,
      headers
    });
    // .pipe(
    //   retry(1)
    // );
  }

  protected delete(
    endpoint: string,
    params?: number | string | HttpParams,
    headers?: HttpHeaders
  ): Observable<any | T> {
    if (params instanceof HttpParams) {
      return this.httpClient.delete<T>(`${this.url}/${endpoint}`, {
        params,
        headers
      });
    } else {
      return this.httpClient.delete<T>(`${this.url}/${endpoint}${params ? `/${params}` : ``}`, {
        headers
      });
    }
  }
}
