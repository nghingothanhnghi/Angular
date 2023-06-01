import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-soap-parameters',
  templateUrl: './soap-parameters.component.html',
  styleUrls: ['./soap-parameters.component.scss']
})
export class SoapParametersComponent implements OnInit {

  soapParameterForm: FormGroup;
  onClose: Subject<any>; // Subscribe to get return value from this modal
  name: string;
  type: string;
  value: string;

  constructor(public bsModalRef: BsModalRef, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.onClose = new Subject();

    this.soapParameterForm = this._formBuilder.group({
      name: [this.name, [Validators.required]],
      type: [this.type, [Validators.required]],
      value: [this.value, [Validators.required]]
    });
  }

  get nameCtrl() {
    return this.soapParameterForm.get('name');
  }

  get typeCtrl() {
    return this.soapParameterForm.get('type');
  }

  get valueCtrl() {
    return this.soapParameterForm.get('value');
  }

  ok() {
    let data = this.soapParameterForm.getRawValue();
    this.onClose.next({ paramname: data.name, paramvalue: data.value, type: data.type });
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

}
