import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string;
  isConfirmDialog = false;
  closeBtnName: string;
  confirmBtnName: string;

  public result: Subject<boolean>;

  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.result = new Subject();
  }

  public onConfirm(): void {
    this.result.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.result.next(false);
    this.bsModalRef.hide();
  }
}
