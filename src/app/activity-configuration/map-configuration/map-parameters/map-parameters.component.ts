import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-parameters',
  templateUrl: './map-parameters.component.html',
  styleUrls: ['./map-parameters.component.scss']
})
export class MapParametersComponent implements OnInit {
  mapParameterForm: FormGroup;
  onClose: Subject<any>; // Subscribe to get return value from this modal

  types: { value: number; name: string }[] = [
    { value: 0, name: 'index' },
    { value: 1, name: 'xPath' },
    { value: 2, name: 'xmlField' }
  ];
  type: number;
  name: string;
  note: string;
  active: boolean;

  constructor(public bsModalRef: BsModalRef, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.onClose = new Subject();

    this.mapParameterForm = this._formBuilder.group({
      name: [this.name, [Validators.required]],
      type: [this.type, [Validators.required]],
      note: [this.note],
      active: [this.active]
    });
  }

  get nameCtrl() {
    return this.mapParameterForm.get('name');
  }

  get typeCtrl() {
    return this.mapParameterForm.get('type');
  }

  ok() {
    const data = this.mapParameterForm.getRawValue();
    this.onClose.next({ names: [data.name], type: data.type, note: data.note, active: data.active });
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
