import { OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';

import { ActivityNodeService } from '../services/activity-node.service';
import { ComponentService } from '../services/component.service';
import { RecipeLayoutService, RecipeLayoutMode} from '../services/recipe-layout.service';

import { ComponentModel } from '../models/component';
import { Common } from '../helpers/common.helper';




/**
 * This is the base class for editable nodes. It extends `BaseNodeComponent`
 */
export class BaseNodeConfigurationComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {
  data: any;
  dataProperty: any;

  constructor(
    private _activityService: ActivityNodeService,
    private _recipeLayoutService: RecipeLayoutService,
    protected componentService: ComponentService,
    protected toastrService: ToastrService
  ) { }

  get isDirty(): boolean {
    return JSON.stringify(this.dataProperty) !== JSON.stringify(this.data.property);
  }

  ngOnInit(): void {
    this._recipeLayoutService.toggleLayoutMode(RecipeLayoutMode.ActivityConfiguration);
    this._activityService.currentActivityConfigurationComponent = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      console.debug('Activity Data', this.data);
      this.dataProperty = JSON.parse(JSON.stringify(this.data.property)); // clone property data for edit
    }
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  close(): void {
    this._recipeLayoutService.toggleLayoutMode(RecipeLayoutMode.Normal);
    this._activityService.closeActivity();
    this._activityService.currentActivityConfigurationComponent = null;
  }

  save(): void {
    this._recipeLayoutService.toggleLayoutMode(RecipeLayoutMode.Normal);
    if (this.dataProperty.displayedName && this.dataProperty.displayedName.trim()) {
      this.data.text = this.dataProperty.displayedName;
    } else {
      this.dataProperty.displayedName = this.data.text;
    }

    this.data.property = this.dataProperty;
    this._activityService.closeActivity();
    this._activityService.currentActivityConfigurationComponent = null;
    this.toastrService.success(`Save ${this.data.name} property successfully`);
    console.debug('Save Activity Data', this.data);
  }

  openCloneComponent(component: ComponentModel): void {
    if (!component.ownerId || Common.isGuidEmpty(component.ownerId)) {
      component.id = uuid();
      component.isNew = true;
      component.ownerId = this.data.id;
      //component.customer_key = this.authenService.currentUserValue.customer_key;
    } else {
      component.isNew = false;
    }
    this.componentService.openComponent(component);
  }

  // Create embed-component in ownerId from master-component (embed-component is similar to master-component without content)
  protected createCloneComponent(component: ComponentModel): ComponentModel {
    const embeddedComponent = JSON.parse(component.content) as ComponentModel;
    embeddedComponent.id = component.id;
    embeddedComponent.ownerId = component.ownerId;
    embeddedComponent.clone = true;
    embeddedComponent.name = component.name;
    embeddedComponent.type = component.type;
    embeddedComponent.localType = component.localType;
    return embeddedComponent;
  }
}
