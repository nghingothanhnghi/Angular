import { Component, OnInit, Input, OnDestroy, AfterViewInit  } from '@angular/core';
import { jsPlumbToolkit, jsPlumbUtil, jsPlumbToolkitOptions } from 'jsplumbtoolkit';
import { jsPlumbService } from 'jsplumbtoolkit-angular';
import { classToPlainFromExist } from 'class-transformer';

import { Subscription } from 'rxjs';

import { ComponentService} from '../services/component.service';
import { ActivityNodeService} from '../services/activity-node.service';
import { WorkflowService, WorkflowStatus} from '../services/workflow.service';
import { RecipeLayoutMode, RecipeLayoutService} from '../services/recipe-layout.service';
import { DetailProcessLogsService} from '../services/detail-process-logs.service';


import { ComponentModel } from '../models/component';
import { LayoutAction } from '../models/layout-action';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [
    { provide: ActivityNodeService },
    { provide: RecipeLayoutService },
    { provide: WorkflowService },
    { provide: DetailProcessLogsService }]
})
export class RecipeComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() component: ComponentModel;
  private _subscriptions: Subscription[] = [];
  private _originComponentContent: string;

  lockMode: boolean = false;
  runMode: boolean = false;
  canSave: boolean = false;
  canImport: boolean = false;
  showToolbox: boolean = true;
  showLog: boolean = false;
  showConfiguration: boolean = false;

  toolkitId: string;
  toolkit: jsPlumbToolkit;
  toolkitParams: jsPlumbToolkitOptions = {
    maxSelectedNodes: 1,
    nodeFactory: (type: string, data: any, callback: Function) => {
      data.id = jsPlumbUtil.uuid();
      callback(data);
    },
    beforeConnect: function (source, target, edgeData) {
      return source !== target;
    },
    beforeStartConnect: () => {
      return !this.lockMode && { label: '...' };
    },
    beforeStartDetach: () => {
      return !this.lockMode;
    }
  };

  constructor(
    private _jsplumb: jsPlumbService,
    private _componentService: ComponentService,
    private _recipeLayoutService: RecipeLayoutService,
    private _workflowService: WorkflowService,
    private _activityService: ActivityNodeService,
    private _detailProcessLogsService: DetailProcessLogsService
  ) { }


  ngOnInit(): void {
    this.canSave = this.component.localType !== 'ProcessLibrary';
    this.canImport = this.component.localType === 'ProcessLibrary';

    this.createOriginComponentContent();
    this.toolkitId = this.component.id;
    this.toolkit = this._jsplumb.getToolkit(this.toolkitId, this.toolkitParams);

    this._subscriptions.push(this._recipeLayoutService.layoutAction$.subscribe(info => {
      if (info.part === 'Configuration') {
        this.showConfiguration =
          info.action === LayoutAction.Show
            ? true
            : info.action === LayoutAction.Hide
              ? false
              : !this.showConfiguration;
      }
    }));

    this._subscriptions.push(this._recipeLayoutService.toggleLayoutMode$.subscribe(mode => {
      setTimeout(() => {
        this.runMode = mode === RecipeLayoutMode.Run;
        this.lockMode = mode == RecipeLayoutMode.Run || mode == RecipeLayoutMode.ActivityConfiguration;
        this.showToolbox = !this.lockMode;
      }, 0);
    }));

    this._subscriptions.push(this._workflowService.workflowRun$.subscribe(info => {
      console.debug(
        `[Workflow] Worker: ${info.workerId} | Activity: ${info.activityId} > ${info.activityName} | Status: ${
        WorkflowStatus[info.status]
        } | Refresh: ${info.refreshAfterSeconds} | Message: ${info.message}`
      );
      if (info.status === WorkflowStatus.RECEIVED) {
        //this._toastrService.info(`Run ${this.component.name} recipe`);
      }

      // We do not show error status on activity if user does not select document in result document pane. So if WorkflowStatus is FAILED, we convert to empty string.
      this._activityService.changeActivityStatus({
        id: info.activityId,
        status: info.status != WorkflowStatus.FAILED ? WorkflowStatus[info.status] : ''
      });
    }));

    this._subscriptions.push(this._workflowService.workflowRunCompleted$.subscribe(info => {
      if (info.status === WorkflowStatus.FAILED) {
        //this._toastrService.error(`Run ${this.component.name} recipe failed. ${info.message}`);
      } else if (info.status === WorkflowStatus.DONE) {
        //this._toastrService.success(`Run ${this.component.name} recipe successfully`);
      }
    }));

    this._subscriptions.push(this._workflowService.error$.subscribe(data => {
      //this._toastrService.error(data.message);
    }));
  }

  ngAfterViewInit() {
    this.toolkit.load({ data: this.component.data });
  }

  ngOnDestroy() {
    console.debug('Workflow being destroyed');
    this._workflowService.stopWorkflow();
    this.toolkit.clear();
    delete this._jsplumb.toolkits[this.toolkitId];

    // prevent memory leak when component destroyed
    this._subscriptions.forEach(subscription => { subscription.unsubscribe(); });
  }

  save() {
    classToPlainFromExist(this.toolkit.exportData(), this.component.data);
    this.component.content = this.component.data;

    this._subscriptions.push(this._componentService.saveComponent(this.component).subscribe((data) => {
      this._componentService.saveComponentCompleted(this.component); // notify save component completed, component tree can listen to this event to add component in tree
      this.component.isNew = false;
      this.createOriginComponentContent();
      //this._toastrService.info(`Save ${this.component.name} successful`);

      // Add library component to component tree if this component is set to add to libary
      if (data.libraryId) {
        this._componentService.saveComponentCompleted(data.libraryId); // notify save component completed, component tree can listen to this event to add component in tree
        this._componentService.openComponent(data.libraryId); // notify open component, build can listen to this event to open component tab
      }
    }));
  }

  cancel() {
    this._componentService.closeComponent(this.component.id);
  }

  import() {
    this._componentService.importComponentFromLibrary(this.component.id).subscribe(response => {
      let id: string = response.componentId;
      if (id) {
        this._componentService.saveComponentCompleted(id); // notify save component completed, component tree can listen to this event to add component in tree
        this._componentService.openComponent(id); // notify open component, build can listen to this event to open component tab
      }
    });
  }

  run() {
    let validate = this.canRunWorkflow();
    if (!validate[0]) {
      //this._toastrService.warning(validate[1]);
    } else {
      this.toggleLayoutMode(RecipeLayoutMode.Run);
      this._workflowService.runWorkflow(this.component);
    }
  }

  back() {
    this.toggleLayoutMode(RecipeLayoutMode.Normal);
    this._workflowService.stopWorkflow();
  }

  showLogs() {
    this._detailProcessLogsService.showLogs();
  }

  private createOriginComponentContent() {
    this._originComponentContent = JSON.stringify(this.component);
  }

  private canRunWorkflow(): [boolean, string] {
    if (this.component.localType === 'ProcessLibrary') {
      return [false, 'Please import this recipe to save a new one on your side before running'];
    }

    if (JSON.stringify(this.component) !== this._originComponentContent) {
      return [false, `Recipe ${this.component.name} must be saved before run test`];
    }

    return [true, ''];
  }

  private toggleLayoutMode(mode: RecipeLayoutMode) {
    this._recipeLayoutService.toggleLayoutMode(mode); // Notify recipe toggle run mode
    let runMode: boolean = mode === RecipeLayoutMode.Run;
    this.showToolbox = !runMode;
    this.showConfiguration = false;
    this.showLog = runMode;
  }

}
