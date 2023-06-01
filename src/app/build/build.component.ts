import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';


import { NewComponentComponent } from '../new-component/new-component.component';
import { ComponentService } from '../services/component.service';
import { ComponentModel } from '../models/component';



@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {
  components: string[] = ['Recipe', 'Map', 'HTTP']; // Tab
  activedComponent = this.components[0];

  private _bsModalRef: BsModalRef;
  private _subscriptions: Subscription[] = [];


  constructor(
    private _modalService: BsModalService,
    private _componentService: ComponentService,
  ) { }

  ngOnInit(): void {
  }
  openNewComponentModal(event?) {
    const initialState = event !== undefined ? { type: event.type, localType: event.localType } : {};
    this._bsModalRef = this._modalService.show(NewComponentComponent, { initialState });
    this._subscriptions.push(this._bsModalRef.content.onClose.subscribe(result => {

    }));
  }

}
