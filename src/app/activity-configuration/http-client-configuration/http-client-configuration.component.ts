import { Component, Input, ViewChildren, QueryList, OnInit, OnDestroy, AfterViewInit, SimpleChanges } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ComponentService} from '../../services/component.service';
import { AuthenticationService} from '../../services/authentication.service';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

import { ComponentModel } from '../../models/component';
import { HttpClientParametersComponent } from './http-client-parameters/http-client-parameters.component';

@Component({
  selector: 'app-http-client-configuration',
  templateUrl: './http-client-configuration.component.html',
  styleUrls: ['./http-client-configuration.component.scss']
})
export class HttpClientConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;

  private _subscriptions: Subscription[] = [];
  bsModalRef: BsModalRef;
  configItems: string[] = ['General', 'Parameters', 'Retry'];
  activeConfigItemIndex = 0;
  connections$: Observable<ComponentModel[]>;
  operations$: Observable<ComponentModel[]>;

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  parametersTableTrigger: Subject<any> = new Subject();
  parametersTableOptions: any = {};

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    componentService: ComponentService,
    toastrService: ToastrService,
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
        case 'Operation':
          this.dataProperty.httpClientSettings.operatorinfo = this.createCloneComponent(component);
          this.getListComponentOperation();
          break;
        case 'Connection':
          this.dataProperty.httpClientSettings.connectioninfo = this.createCloneComponent(component);
          this.getListComponentConnection();
          break;
      }
      this.toastrService.success(`Save ${component.name} ${component.type} to Http Client Property successful`);
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.data) {
      this.parametersTableOptions = {
        data: this.dataProperty.httpClientSettings.parameters,
        dom: '<"panel-heading-tbl-filter"fl>t<"panel-heading-tbl-filter-bottom"ip><"clear">',
        select: { style: 'single' },
        columns: [
          { title: 'Parameter', data: 'name' },
          { title: 'Parameter Type', data: 'type' },
          { title: 'Value', data: 'value' }
        ]
      };

      if (this.dtElements) {
        this.refreshTable(this.dtElements.find((item, index) => index === 0), this.parametersTableTrigger);
      }

      this.getListComponentConnection();
      this.getListComponentOperation();
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
    const operatorinfo = this.dataProperty.httpClientSettings.operatorinfo;
    const initialState = { httpMethod: operatorinfo.httpMethod, responseDataType: operatorinfo.responseProfileType };
    this.bsModalRef = this._modalService.show(HttpClientParametersComponent, { initialState });
    this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.dataProperty.httpClientSettings.parameters.push(result);
        this.refreshTable(parametersTable, this.parametersTableTrigger);
      }
    }));
  }

  editParameter() {
    const parametersTable = this.dtElements.find((item, index) => index === 0);
    parametersTable.dtInstance.then((dtInstance: DataTables.Api) => {
      const rowIndex: number = dtInstance.row({ selected: true }).index();
      if (typeof rowIndex === 'number') {
        const operatorinfo = this.dataProperty.httpClientSettings.operatorinfo;
        const parameter = this.dataProperty.httpClientSettings.parameters[rowIndex];
        const initialState = {
          httpMethod: operatorinfo.httpMethod,
          responseDataType: operatorinfo.responseProfileType,
          name: parameter.name,
          type: parameter.type,
          value: parameter.value
        };
        this.bsModalRef = this._modalService.show(HttpClientParametersComponent, { initialState });
        this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {
            parameter.name = result.name;
            parameter.type = result.type;
            parameter.value = result.value;
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
        this.dataProperty.httpClientSettings.parameters.splice(rowIndex, 1);
        this.refreshTable(parametersTable, this.parametersTableTrigger);
      }
    });
  }

  onConnectionChanged(id: string) {
    this.embedComponentToItem(id, true);
  }

  onOperationChanged(id: string) {
    this.embedComponentToItem(id, false);
  }

  private getListComponentOperation() {
    this.operations$ = this.componentService.getComponentsByTypeWithDefault(
      'Operation',
      'httpclient',
      this.dataProperty.httpClientSettings.operatorinfo
    );
  }

  private getListComponentConnection() {
    this.connections$ = this.componentService.getComponentsByTypeWithDefault(
      'Connection',
      'httpclient',
      this.dataProperty.httpClientSettings.connectioninfo
    );
  }

  private refreshTable(table: DataTableDirective, trigger: Subject<any>): void {
    table.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      trigger.next();
    });
  }

  private embedComponentToItem(componentId: string, isConnection: boolean = false) {
    this.componentService.getComponent(componentId).subscribe(component => {
      if (component.content) {
        const embeddedComponent = this.createCloneComponent(component);

        if (isConnection) {
          this.dataProperty.httpClientSettings.connectioninfo = embeddedComponent;
        } else {
          this.dataProperty.httpClientSettings.operatorinfo = embeddedComponent;
        }
      }
    });
  }
}
