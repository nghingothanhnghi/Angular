import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GenericService } from './generic.service';
import { ComponentModel } from '../models/component';

import { SettingService } from './setting.service';


@Injectable({
  providedIn: 'root'
})
export class WorkflowService extends GenericService<ComponentModel | any> {
  private _workflowRunSource = new Subject<WorkflowRunEventInfo>();
  workflowRun$ = this._workflowRunSource.asObservable();

  private _workflowRunCompletedSource = new Subject<WorkflowRunEventInfo>();
  workflowRunCompleted$ = this._workflowRunCompletedSource.asObservable();

  private _errorSource = new Subject<WorkflowError>();
  error$ = this._errorSource.asObservable();

  private _isWorkflowStop = true; // Indicate whether workflow is stopped

  constructor(httpClient: HttpClient, settingService: SettingService) {
    super(httpClient);
  
  }

  /**
   * Run a workflow
   *
   * @param {ComponentModel} recipe
   * @returns
   * @memberof WorkflowService
   */
  runWorkflow(recipe: ComponentModel) {
    this.requestWorkflowRun(recipe).subscribe(
      data => {
        this._isWorkflowStop = false;
        let pollingSeconds = 1;
        const workerId: string = data.key;

        this.notifyWorkflowRun(new WorkflowRunEventInfo(workerId, WorkflowStatus.RECEIVED));

        (function trackWorkflow(service: WorkflowService) {
          setTimeout(() => {
            service.getActivityStatus(workerId).subscribe(
              info => {
                pollingSeconds = info.refreshAfterSeconds;
                service.notifyWorkflowRun(info);

                if (info.status !== WorkflowStatus.DONE) {
                  if (pollingSeconds === 0) {
                    service.getResult(workerId).subscribe(
                      result => {
                        service.notifyWorkflowRunCompleted(info.cloneWith(result, WorkflowStatus.FAILED));
                      },
                      error => {
                        service.notifyAndThrowError(
                          error,
                          `Run ${recipe.name} recipe failed, API ucapi/Process/GetLog error`,
                          recipe.id,
                          workerId
                        );
                      }
                    );
                  } else if (!service._isWorkflowStop) {
                    trackWorkflow(service);
                  }
                } else {
                  service.getResult(workerId).subscribe(
                    result => {
                      service.notifyWorkflowRunCompleted(info.cloneWith(result));
                    },
                    error => {
                      service.notifyAndThrowError(
                        error,
                        `Run ${recipe.name} recipe failed, API ucapi/Process/GetLog error`,
                        recipe.id,
                        workerId
                      );
                    }
                  );
                }
              },
              error => {
                service.notifyAndThrowError(
                  error,
                  `Run ${recipe.name} recipe failed, API ucapi/Process/Status error`,
                  recipe.id,
                  workerId
                );
              }
            );
          }, pollingSeconds * 1000);
        })(this);
      },
      error => {
        this.notifyAndThrowError(error, `Run ${recipe.name} recipe failed, API ucapi/Process/Run error`, recipe.id);
      }
    );
  }

  /**
   * Stop a workflow
   *
   * @memberof WorkflowService
   */
  stopWorkflow(): void {
    this._isWorkflowStop = true;
  }

  /**
   * Notify and throw error
   *
   * @private
   * @param {*} error
   * @param {string} message
   * @param {string} recipeId
   * @param {string} [workerId=null]
   * @memberof WorkflowService
   */
  private notifyAndThrowError(error: any, message: string, recipeId: string, workerId: string = null) {
    this.notifyError(new WorkflowError(message, recipeId));
    this._isWorkflowStop = true;
    throw error;
  }

  /**
   * Gets result after ran workflow
   *
   * @private
   * @param {string} workerId workerId An transaction identity that is returned after call runworkflow method.
   * @returns
   * @memberof WorkflowService
   */
  private getResult(workerId: string) {
    return this.get('ucapi/Process/GetLog/' + workerId);
  }

  /**
   * Notify to subscriber that workflow have ran
   *
   * @private
   * @param {WorkflowRunEventInfo} info
   * @memberof WorkflowService
   */
  private notifyWorkflowRun(info: WorkflowRunEventInfo) {
    this._workflowRunSource.next(info);
  }

  private notifyError(e: WorkflowError) {
    this._errorSource.next(e);
  }

  /**
   * Notify to subscriber that workflow run to completed
   *
   * @private
   * @param {WorkflowRunEventInfo} info
   * @memberof WorkflowService
   */
  private notifyWorkflowRunCompleted(info: WorkflowRunEventInfo) {
    this._workflowRunCompletedSource.next(info);
    this._isWorkflowStop = true;
  }

  /**
   * Request a workflow run
   * @param recipe
   */
  private requestWorkflowRun(recipe: ComponentModel) {
    return this.post('ucapi/Process/Run', recipe);
  }

  /**
   * Gets status of an activity in workflow when workflow is running
   * @param workerId An transaction identity that is returned after call runworkflow method.
   */
  private getActivityStatus(workerId: string) {
    return this.get('ucapi/Process/Status/' + workerId).pipe(
      map(response => {
        const info = new WorkflowRunEventInfo(
          response.work_id,
          WorkflowStatus[response.data.state as string],
          response.activity_id,
          response.name,
          response.data.refresh,
          response.data.message
        );
        return info;
      })
    );
  }
}

/**
 * Status of API
 * API error: exception, Application didn't receive response (workflow status), set status FAILED => stop run
 * API response workflow info:
 *  - status: WAITING, RUNNING => continue
 *  - status: DONE => stop run, Success
 *  - status: CANCEL, FAILED => stop run, Failed
 * @export
 * @enum {number}
 */
export enum WorkflowStatus {
  RECEIVED,
  WAITING,
  RUNNING,
  DONE,
  FAILED,
  CANCEL
}

export class WorkflowRunEventInfo {
  /**
   * Creates an instance of WorkflowRunEventInfo.
   * @param {string} _workerId
   * @param {WorkflowStatus} _status
   * @param {string} [_activityId=null]
   * @param {string} [_activityName=null]
   * @param {number} [_refreshAfterSeconds=1]
   * @param {string} [_message=null]
   * @param {*} [_result=null]
   * @memberof WorkflowRunEventInfo
   */
  constructor(
    private _workerId: string,
    private _status: WorkflowStatus,
    private _activityId: string = null,
    private _activityName: string = null,
    private _refreshAfterSeconds: number = 1,
    private _message: string = null,
    private _result: any = null
  ) {}

  /**
   * Return workflow transaction identity
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowRunEventInfo
   */
  get workerId(): string {
    return this._workerId;
  }
  /**
   * Indicates which activity is running
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowRunEventInfo
   */
  get activityId(): string {
    return this._activityId;
  }

  /**
   * Return name of activity that is running
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowRunEventInfo
   */
  get activityName(): string {
    return this._activityName;
  }
  /**
   * Gets workflow status
   *
   * @readonly
   * @type {WorkflowStatus}
   * @memberof WorkflowRunEventInfo
   */
  get status(): WorkflowStatus {
    return this._status;
  }

  /**
   * Returns total seconds that workflow status is updated
   *
   * @readonly
   * @type {number}
   * @memberof WorkflowRunEventInfo
   */
  get refreshAfterSeconds(): number {
    return this._refreshAfterSeconds;
  }

  /**
   * Returns message
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowRunEventInfo
   */
  get message(): string {
    return this._message;
  }

  /**
   * Gets result
   *
   * @readonly
   * @type {*}
   * @memberof WorkflowRunEventInfo
   */
  get result(): any {
    return this._result;
  }

  /**
   * Create a new instance with result and workflow status
   *
   * @param {*} result
   * @param {WorkflowStatus} [status=null]
   * @returns {WorkflowRunEventInfo}
   * @memberof WorkflowRunEventInfo
   */
  cloneWith(result: any, status: WorkflowStatus = null): WorkflowRunEventInfo {
    return new WorkflowRunEventInfo(
      this._workerId,
      status ? status : this.status,
      this.activityId,
      this.activityName,
      this.refreshAfterSeconds,
      this.message,
      result
    );
  }
}

export class WorkflowError {
  /**
   * Creates an instance of WorkflowError.
   * @param {string} _message error message
   * @param {string} [_id=null] recipe identity
   * @param {string} [_workerId=null] workflow transaction identity
   * @memberof WorkflowError
   */
  constructor(private _message: string, private _id: string = null, private _workerId: string = null) {}

  /**
   * Returns error message
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowError
   */
  get message(): string {
    return this._message;
  }

  /**
   * Return recipe identity
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowError
   */
  get id(): string {
    return this._id;
  }

  /**
   * Return workflow transaction identity
   *
   * @readonly
   * @type {string}
   * @memberof WorkflowError
   */
  get workerId(): string {
    return this._workerId;
  }
}
