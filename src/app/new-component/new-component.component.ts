import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';


import { ComponentModel } from '../models/component';
import { ComponentType, ComponentTypeGroup } from '../models/component-type';
import { ComponentFactory } from '../models/component-factory';

import { ComponentService } from '../services/component.service';



@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.scss']
})
export class NewComponentComponent implements OnInit {
  newComponentForm: FormGroup;
  componentTypeGroups: ComponentTypeGroup[];
  // component type. Using initialState = { type: 'Process', localType: 'Process' } when call this modal to init this value
  type: string;
  // component local type. Using initialState = { type: 'Process', localType: 'Process' } when call this modal to init this value
  localType: string;

  onClose: Subject<ComponentModel>; // Subscribe to get return value from this modal
  private _timestamp: number; // Using to generate map id
  //isAdmin: boolean = environment.isAdmin;

  constructor(
    public bsModalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _componentService: ComponentService,
    //private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this._timestamp = Date.now();
    this.onClose = new Subject();
    this.componentTypeGroups = this._componentService.getComponentTypeGroups();
    const componentType: ComponentType = this._componentService.getComponentType(this.type, this.localType);

    this.newComponentForm = this._formBuilder.group({
      componentType: [componentType, [Validators.required]],
      componentName: ['', [Validators.required, Validators.maxLength(200)]],
      useDiUniteMap: false,
      mapId: [{ value: '', disabled: true }],
      addToLibrary: false
    });

    this.newComponentForm.get('useDiUniteMap').valueChanges.subscribe(useDiUniteMap => {
      if (useDiUniteMap) {
        this.newComponentForm.get('mapId').enable();
      } else {
        this.newComponentForm.get('mapId').disable();
      }
    });

    this.newComponentForm.get('componentName').valueChanges.subscribe(name => {
      this.newComponentForm.get('mapId').setValue(name + '_' + this._timestamp);
    });
  }

  get componentType() {
    return this.newComponentForm.get('componentType');
  }

  get componentName() {
    return this.newComponentForm.get('componentName');
  }

  create() {
    const data = this.newComponentForm.getRawValue();
    //const user: UserModel = this._authService.currentUserValue;

    const component: ComponentModel = new ComponentFactory().create({
      type: data.componentType.type,
      localType: data.componentType.type.toLowerCase() === 'map' && data.useDiUniteMap ? 'map' : data.componentType.localType,
      name: data.componentName,
      isLibrary: data.addToLibrary,
      useDiUniteMap: data.useDiUniteMap,
      mapID: data.mapId,
      //customerId: user.customerId,
      //customerKey: user.customer_key
    });
    component.isNew = true;

    this.onClose.next(component);
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
