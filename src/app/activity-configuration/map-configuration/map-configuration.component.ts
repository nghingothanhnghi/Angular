import { Component, Input, ViewChildren, QueryList, AfterViewInit, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ComponentService} from '../../services/component.service';
import { AuthenticationService} from '../../services/authentication.service';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

import { ComponentModel } from '../../models/component';
import { MapParametersComponent } from './map-parameters/map-parameters.component';

@Component({
  selector: 'app-map-configuration',
  templateUrl: './map-configuration.component.html',
  styleUrls: ['./map-configuration.component.scss']
})
export class MapConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;
  private _subscriptions: Subscription[] = [];

  configItems: string[] = ['General', 'Fields'];
  activeConfigItemIndex = 0;
  bsModalRef: BsModalRef;
  maps: ComponentModel[];

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  parametersTableTrigger: Subject<any> = new Subject();
  parametersTableOptions: any = {};

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    toastrService: ToastrService,
    componentService: ComponentService,
    private _modalService: BsModalService
  ) {
    super(activityService, recipeLayoutService, authenService, componentService, toastrService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscriptions.push(this.componentService.componentSaved$.subscribe((component: ComponentModel) => {
      if (!component.clone && component.ownerId !== this.data.id) return;
      this.componentService.closeComponent(component.id);

      switch (component.type) {
        case 'Map':
          this.dataProperty.settings.diUniteMapDataUsing = this.createCloneComponent(component);
          break;
      }
      this.getListComponent();
      this.toastrService.success(`Save ${component.name} ${component.type} to Map Property successful`);
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.data) {
      this.parametersTableOptions = {
        data: this.dataProperty.settings.tracing,
        dom: '<"panel-heading-tbl-filter"fl>t<"panel-heading-tbl-filter-bottom"ip><"clear">',
        select: { style: 'single' },
        columns: [
          { title: 'Name', data: 'names' },
          {
            title: 'Type',
            data: null,
            render(data) {
              const types = ['index', 'xPath', 'xmlField'];
              return types[data.type];
            }
          },
          { title: 'Active', data: 'active' }
        ]
      };

      if (this.dtElements) {
        this.refreshTable(this.dtElements.find((item, index) => index === 0), this.parametersTableTrigger);
      }

      this.getListComponent();
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.parametersTableTrigger.next();
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this._subscriptions.forEach(subscription => { subscription.unsubscribe(); });
    this.parametersTableTrigger.unsubscribe();
  }

  addParameter() {
    const parametersTable = this.dtElements.find((item, index) => index === 0);
    const initialState = { type: 0, name: '', note: '', active: true };
    this.bsModalRef = this._modalService.show(MapParametersComponent, { initialState });
    this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.dataProperty.settings.tracing.push(result);
        this.refreshTable(parametersTable, this.parametersTableTrigger);
      }
    }));
  }

  editParameter() {
    const parametersTable = this.dtElements.find((item, index) => index === 0);
    parametersTable.dtInstance.then((dtInstance: DataTables.Api) => {
      const rowIndex: number = dtInstance.row({ selected: true }).index();
      if (typeof rowIndex === 'number') {
        const parameter = this.dataProperty.settings.tracing[rowIndex];
        const initialState = {
          type: parameter.type,
          name: parameter.names[0],
          note: parameter.note,
          active: parameter.active
        };
        this.bsModalRef = this._modalService.show(MapParametersComponent, { initialState });
        this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {
            parameter.names = result.names;
            parameter.type = result.type;
            parameter.note = result.note;
            parameter.active = result.active;
            this.refreshTable(parametersTable, this.parametersTableTrigger);
          }
        }));
      }
    });
  }

  deleteParameter() {
    const parametersTable = this.dtElements.find((item, index) => index === 0);
    parametersTable.dtInstance.then((dtInstance: DataTables.Api) => {
      const rowIndex: number = dtInstance.row({ selected: true }).index();
      if (typeof rowIndex === 'number') {
        this.dataProperty.settings.tracing.splice(rowIndex, 1);
        this.refreshTable(parametersTable, this.parametersTableTrigger);
      }
    });
  }

  onMapChanged(id: string) {
    this.embedComponentToItem(id);
  }

  private getListComponent() {
    this._subscriptions.push(this.componentService
      .getComponentsByTypeWithDefault('Map', '', this.dataProperty.settings.diUniteMapDataUsing)
      .subscribe(data => (this.maps = data)));
  }

  private refreshTable(table: DataTableDirective, trigger: Subject<any>): void {
    table.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      trigger.next();
    });
  }

  private embedComponentToItem(componentId: string) {
    this.componentService.getComponent(componentId).subscribe(component => {
      if (component.content) {
        const embeddedComponent = this.createCloneComponent(component);
        this.dataProperty.settings.diUniteMapDataUsing = embeddedComponent;
      }
    });
  }
}
