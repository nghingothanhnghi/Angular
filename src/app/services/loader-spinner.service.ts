import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderSpinnerService {
  isLoading = new Subject<boolean>();
  isAsync = new Subject<boolean>();
  constructor() { }
  doingAsync(isAsync: boolean){
    this.isAsync.next(isAsync);
  }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
