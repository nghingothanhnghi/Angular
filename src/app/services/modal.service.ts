import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal/';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private bsModalService: BsModalService) {}

  showConfirm(
    message: string | any,
    title = '',
    confirmButtonText = 'Yes',
    closeButtonText = 'No'
  ): Subject<boolean> {
    const initialState = {
      list: [message],
      title,
      isConfirmDialog: true,
      closeBtnName: closeButtonText,
      confirmBtnName: confirmButtonText
    };
    const modal = this.bsModalService.show(ModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });
    return modal.content.result;
  }

  showModal(
    message: string | any,
    title = '',
    closeButtonText = 'Close'
  ): void {
    const initialState = {
      list: [message],
      title,
      closeBtnName: closeButtonText
    };
    this.bsModalService.show(ModalComponent, {
      initialState
    });
  }
}
