import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { SettingModel } from '../models/settings';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private settings = new SettingModel();
  private functions: any;
  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  load(): Observable<any> {
    return merge(
      this.http.get('./src/settings/settings.json').pipe(
        tap(settings => {
          Object.assign(this.settings, settings);
        }),
        catchError(err => {
          console.error('ERROR getting settings data', err);
          return throwError(err || 'Server error while getting settings');
        })
      ),
      this.http.get('./src/settings/functions.json').pipe(
        tap((data: any) => {
          this.functions = data;
        }),
        catchError(err => {
          console.error('ERROR getting functions data', err);
          return throwError(err || 'Server error while getting functions');
        })
      )
    );
  }

  // (200421)
  getConfiguration(): SettingModel {
    // if (!environment.production) Object.assign(this.settings, environment.endpoint);
    if (this.settings && this.settings.service) {
      return this.settings;
    } else console.error('Settings of endpoints are not available!');
  }

  getFunction(): any {
    return this.functions;
  }
}
