
import { Injectable } from '@angular/core';
import { BuildLayoutService } from './build-layout.service';
import { Subject } from 'rxjs/internal/Subject';

export enum RecipeLayoutMode {
  Normal,
  Run,
  ActivityConfiguration
}

@Injectable()
export class RecipeLayoutService extends BuildLayoutService {

  private toggleLayoutModeSource = new Subject<RecipeLayoutMode>();
  toggleLayoutMode$ = this.toggleLayoutModeSource.asObservable();

  constructor() { super() }

  toggleLayoutMode(mode: RecipeLayoutMode): void {
    this.toggleLayoutModeSource.next(mode);
  }
}
