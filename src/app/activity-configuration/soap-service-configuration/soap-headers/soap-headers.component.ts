import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-soap-headers',
  templateUrl: './soap-headers.component.html',
  styleUrls: ['./soap-headers.component.scss']
})
export class SoapHeadersComponent implements OnInit {

  soapHeaderForm: FormGroup;
  onClose: Subject<any>; // Subscribe to get return value from this modal
  key: string;
  value: string;

  constructor(public bsModalRef: BsModalRef, private _formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.onClose = new Subject();

    this.soapHeaderForm = this._formBuilder.group({
      key: [this.key, [Validators.required]],
      value: [this.value, [Validators.required]]
    });
  }

  get keyCtrl() {
    return this.soapHeaderForm.get('key');
  }

  get valueCtrl() {
    return this.soapHeaderForm.get('value');
  }

  ok() {
    let data = this.soapHeaderForm.getRawValue();
    this.onClose.next(data);
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

}
