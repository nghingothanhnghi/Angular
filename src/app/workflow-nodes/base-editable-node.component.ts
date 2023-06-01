import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Node } from 'jsplumbtoolkit';
import { BaseNodeComponent } from 'jsplumbtoolkit-angular';
import { Subscription } from 'rxjs/internal/Subscription';

import { ActivityNodeService,} from '../services/activity-node.service';
import { RecipeLayoutService, RecipeLayoutMode} from '../services/recipe-layout.service';
import { ActivityStatusChangedInfo } from '../models/process-recipe-data';

function isNode(obj: any): obj is Node {
  return obj.objectType === 'Node';
}

/**
 * This is the base class for editable nodes. It extends `BaseNodeComponent`
 */
export class BaseEditableNodeComponent extends BaseNodeComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscriptions: Subscription[] = [];
  status: string = '';
  lockMode: boolean = false;

  constructor(
    private _activityService: ActivityNodeService,
    private _recipeLayoutService: RecipeLayoutService) {
    super();
  }

  ngOnInit(): void {
    this.initDefaultData();
  }

  ngAfterViewInit(): void {
    this._subscriptions.push(this._activityService.activityStatusChanged$.subscribe(info => this.changeStatus(info)));
    this._subscriptions.push(this._recipeLayoutService.toggleLayoutMode$.subscribe(mode => {
      setTimeout(() => { this.lockMode = mode == RecipeLayoutMode.Run || mode == RecipeLayoutMode.ActivityConfiguration; }, 0);
      this.status = '';
    }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  /**
   * Implement in subclass to initialize additional info for data
   *
   * @protected
   * @memberof BaseEditableNodeComponent
   */
  protected initDefaultData(): void { }

  removeNode(): void {
    let obj = this.getNode();
    if (obj != null) {
      if (isNode(obj)) {
        this.toolkit.removeNode(<Node>obj);
      }
    }
  }

  editNode(): void {
    let obj = this.getNode();

    // Notify a event to listener that this activity need to config. Activity configuration component is listening to event
    this._activityService.configActivity(obj.data);
  }

  private changeStatus(info: ActivityStatusChangedInfo | ActivityStatusChangedInfo[]): void {
    if (!this.lockMode) {
      return;
    }

    let activity = this.getNode().data;
    let activityStatusChangedInfo: ActivityStatusChangedInfo =
      info instanceof Array
        ? info.find(x => (!x.id && activity.type === 'Start') || (x.id && x.id == activity.id))
        : info;

    if (
      activityStatusChangedInfo &&
      ((!activityStatusChangedInfo.id && activity.type === 'Start') ||
        (activityStatusChangedInfo.id && activityStatusChangedInfo.id === activity.id))
    ) {
      this.status = activityStatusChangedInfo.status?.toLowerCase();
    } else {
      this.status = '';
    }
  }
}
