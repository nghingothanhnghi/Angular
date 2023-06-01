import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectionActivityChangedInfo, ActivityStatusChangedInfo } from '../models/process-recipe-data';
import { BaseNodeConfigurationComponent } from '../activity-configuration/base-node-Configuration.component';

@Injectable()
export class ActivityNodeService {

  constructor() { }

  private activityConfigedSource = new Subject<any>();
  activityConfiged$ = this.activityConfigedSource.asObservable();

  private activityClosedSource = new Subject();
  activityClosed$ = this.activityClosedSource.asObservable();

  private activitySavedSource = new Subject<any>();
  activitySaved$ = this.activitySavedSource.asObservable();

  private activityChangedSource = new Subject<SelectionActivityChangedInfo>();
  activityChanged$ = this.activityChangedSource.asObservable();

  private activityStatusChangedSource = new Subject<ActivityStatusChangedInfo | ActivityStatusChangedInfo[]>();
  activityStatusChanged$ = this.activityStatusChangedSource.asObservable();

  currentActivityConfigurationComponent: BaseNodeConfigurationComponent;

  configActivity(data: any) {
    this.activityConfigedSource.next(data);
  }

  saveActivity(data: any) {
    this.activitySavedSource.next(data);
  }

  closeActivity() {
    this.activityClosedSource.next();
  }

  changeActivity(info: SelectionActivityChangedInfo) {
    this.activityChangedSource.next(info);
  }

  changeActivityStatus(info: ActivityStatusChangedInfo | ActivityStatusChangedInfo[]) {
    this.activityStatusChangedSource.next(info);
  }
}
