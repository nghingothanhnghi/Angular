import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Common } from '~app/helpers';

@Component({
  selector: 'app-http-client-parameters',
  templateUrl: './http-client-parameters.component.html',
  styleUrls: ['./http-client-parameters.component.scss']
})
export class HttpClientParametersComponent implements OnInit {
  httpClientParameterForm: FormGroup;
  onClose: Subject<any>; // Subscribe to get return value from this modal
  modalTitle = '';
  httpMethods: { value: string; text: string; action: string; parameterTypes: number[] }[];
  httpParameterTypes: { value: string; text: string }[] = [];

  httpMethod: string;
  responseDataType: string;
  name: string;
  type: string;
  value: string;

  constructor(public bsModalRef: BsModalRef, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.onClose = new Subject();
    this.httpMethods = Common.httpMethods;

    const httpMethodObject = this.httpMethods.find(x => x.value === this.httpMethod);
    this.modalTitle = this.name ? 'Edit Http Client Parameter Value' : 'Add New Http Client Parameter Value';

    if (httpMethodObject) {
      const indexes = httpMethodObject.parameterTypes;
      const allHttpParameterTypes = Common.httpParameterTypes;
      for (const i of indexes) {
        const parameterType = allHttpParameterTypes[i];
        this.httpParameterTypes.push(parameterType);
      }
    }

    this.httpClientParameterForm = this._formBuilder.group({
      httpMethod: [{ value: this.httpMethod, disabled: true }],
      responseDataType: [{ value: this.responseDataType, disabled: true }],
      name: [this.name, [Validators.required]],
      type: [this.type, [Validators.required]],
      value: [this.value, [Validators.required]]
    });
    this.f.httpMethod.setValue(this.httpMethod);
  }
  get f() {
    return this.httpClientParameterForm.controls;
  }

  get nameCtrl() {
    return this.httpClientParameterForm.get('name');
  }

  get typeCtrl() {
    return this.httpClientParameterForm.get('type');
  }

  get valueCtrl() {
    return this.httpClientParameterForm.get('value');
  }

  ok() {
    const data = this.httpClientParameterForm.getRawValue();
    this.onClose.next({ name: data.name, value: data.value, type: data.type });
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
