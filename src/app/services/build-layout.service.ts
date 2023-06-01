import { Injectable } from '@angular/core';
import { LayoutActionInfo } from '../models/layout-action-info';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildLayoutService {

  private layoutActionSource = new Subject<LayoutActionInfo>();
  layoutAction$ = this.layoutActionSource.asObservable();

  constructor() { }

  layout(info: LayoutActionInfo) {
    this.layoutActionSource.next(info);
  }
}
