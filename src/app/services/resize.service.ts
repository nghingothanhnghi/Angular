import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export enum SCREEN_SIZE {
  XS = 0,
  SM = 1,
  MD = 2,
  LG = 3,
  XL = 4
}

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private _resizeSubject: Subject<SCREEN_SIZE>;
  private _currentSize: SCREEN_SIZE

  constructor() {
    this._currentSize = SCREEN_SIZE.XS;
    this._resizeSubject = new Subject();
  }

  get onResize$(): Observable<SCREEN_SIZE> {
    return this._resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  onResize(size: SCREEN_SIZE) {
    this._currentSize = size;
    this._resizeSubject.next(size);
  }

  get currentSize(): SCREEN_SIZE {
    return this._currentSize;
  }
}
