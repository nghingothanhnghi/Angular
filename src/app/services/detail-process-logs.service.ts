import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivityLog } from '../models/process-recipe-data';

@Injectable()
export class DetailProcessLogsService {

  private showLogsSource = new Subject();
  showLogs$ = this.showLogsSource.asObservable();

  private refreshLogsSource = new Subject<ActivityLog[]>();
  refreshLogs$ = this.refreshLogsSource.asObservable();

  constructor() { }

  showLogs(): void {
    this.showLogsSource.next();
  }

  refreshLogs(logs: ActivityLog[]): void {
    this.refreshLogsSource.next(logs);
  }
}
