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
import { SoapHeadersComponent } from './soap-headers/soap-headers.component';
import { SoapParametersComponent } from './soap-parameters/soap-parameters.component';

@Component({
  selector: 'app-soap-service-configuration',
  templateUrl: './soap-service-configuration.component.html',
  styleUrls: ['./soap-service-configuration.component.scss']
})
export class SoapServiceConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;

  private _subscriptions: Subscription[] = [];
  bsModalRef: BsModalRef;
  configItems: string[] = ['General', 'Parameters', 'Headers', 'Retry'];
  activeConfigItemIndex = 0;
  connections$: Observable<ComponentModel[]>;
  operations$: Observable<ComponentModel[]>;

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  headersTableTrigger: Subject<any> = new Subject();
  headersTableOptions: any = {};
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
        case 'Operation':
          this.dataProperty.soapsettings.operatorinfo = this.createCloneComponent(component);
          this.getListComponentOperation();
          break;
        case 'Connection':
          this.dataProperty.soapsettings.connectioninfo = this.createCloneComponent(component);
          this.getListComponentConnection();
          break;
      }
      this.toastrService.success(`Save ${component.name} ${component.type} to SOAP Property successful`);
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.data) {
      this.headersTableOptions = {
        data: this.dataProperty.soapsettings.headers,
        dom: '<"panel-heading-tbl-filter"fl>t<"panel-heading-tbl-filter-bottom"ip><"clear">',
        select: { style: 'single' },
        columns: [
          { title: 'Key', data: 'key' },
          { title: 'Value', data: 'value' }
        ]
      };

      this.parametersTableOptions = {
        data: this.dataProperty.soapsettings.operatorinfo.connectorflows[0].flows[0].parameters,
        dom: '<"panel-heading-tbl-filter"fl>t<"panel-heading-tbl-filter-bottom"ip><"clear">',
        select: { style: 'single' },
        columns: [
          { title: 'Input', data: 'paramname' },
          { title: 'Type', data: 'type' },
          { title: 'Static Value', data: 'paramvalue' }
        ]
      };

      if (this.dtElements) {
        this.refreshTable(this.dtElements.find((item, index) => index === 0), this.parametersTableTrigger);
        this.refreshTable(this.dtElements.find((item, index) => index === 1), this.headersTableTrigger);
      }

      this.getListComponentConnection();
      this.getListComponentOperation();
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.headersTableTrigger.next();
    this.parametersTableTrigger.next();
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this._subscriptions.forEach(subscription => { subscription.unsubscribe(); });
    this.headersTableTrigger.unsubscribe();
    this.parametersTableTrigger.unsubscribe();
  }

  testSoapEnvelope() {
    const url: string = this.dataProperty.soapsettings.operatorinfo.connectorflows[0].flows[0].envelope.wsdlurl;
    const header: string = JSON.stringify(this.dataProperty.soapsettings.headers);
    this.componentService.testSOAPService(url, header).subscribe(
      data => this.toastrService.success('SOAP Web Service is working normally'),
      error => this.toastrService.error('SOAP Web Service is not working')
    );
  }

  addHeader() {
    const headersTable = this.dtElements.find((item, index) => index === 1);
    this.bsModalRef = this._modalService.show(SoapHeadersComponent);
    this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.dataProperty.soapsettings.headers.push(result);
        this.refreshTable(headersTable, this.headersTableTrigger);
      }
    }));
  }

  editHeader() {
    const headersTable = this.dtElements.find((item, index) => index === 1);
    headersTable.dtInstance.then((dtInstance: DataTables.Api) => {
      const rowIndex: number = dtInstance.row({ selected: true }).index();
      if (typeof rowIndex === 'number') {
        const header = this.dataProperty.soapsettings.headers[rowIndex];
        const initialState = { key: header.key, value: header.value };
        this.bsModalRef = this._modalService.show(SoapHeadersComponent, { initialState });
        this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {
            header.key = result.key;
            header.value = result.value;
            this.refreshTable(headersTable, this.headersTableTrigger);
          }
        }));
      }
    });
  }

  deleteHeader() {
    const headersTable = this.dtElements.find((item, index) => index === 1);
    headersTable.dtInstance.then((dtInstance: DataTables.Api) => {
      const rowIndex: number = dtInstance.row({ selected: true }).index();
      if (typeof rowIndex === 'number') {
        this.dataProperty.soapsettings.headers.splice(rowIndex, 1);
        this.refreshTable(headersTable, this.headersTableTrigger);
      }
    });
  }

  addParameter() {
    const parametersTable = this.dtElements.find((item, index) => index === 0);
    this.bsModalRef = this._modalService.show(SoapParametersComponent);
    this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.dataProperty.soapsettings.operatorinfo.connectorflows[0].flows[0].parameters.push(result);
        this.refreshTable(parametersTable, this.parametersTableTrigger);
      }
    }));
  }

  editParameter() {
    const parametersTable = this.dtElements.find((item, index) => index === 0);
    parametersTable.dtInstance.then((dtInstance: DataTables.Api) => {
      const rowIndex: number = dtInstance.row({ selected: true }).index();
      if (typeof rowIndex === 'number') {
        const parameter = this.dataProperty.soapsettings.operatorinfo.connectorflows[0].flows[0].parameters[rowIndex];
        const initialState = { name: parameter.paramname, type: parameter.type, value: parameter.paramvalue };
        this.bsModalRef = this._modalService.show(SoapParametersComponent, { initialState });
        this._subscriptions.push(this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {
            parameter.paramname = result.paramname;
            parameter.type = result.type;
            parameter.paramvalue = result.paramvalue;
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
        this.dataProperty.soapsettings.operatorinfo.connectorflows[0].flows[0].parameters.splice(rowIndex, 1);
        this.refreshTable(parametersTable, this.parametersTableTrigger);
      }
    });
  }

  configParameters() {
    this.activeConfigItemIndex = 1;
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
      'SOAP',
      this.dataProperty.soapsettings.operatorinfo
    );
  }

  private getListComponentConnection() {
    this.connections$ = this.componentService.getComponentsByTypeWithDefault(
      'Connection',
      'SOAP',
      this.dataProperty.soapsettings.connectioninfo
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
          this.dataProperty.soapsettings.connectioninfo = embeddedComponent;
        } else {
          const envelope = this.dataProperty.soapsettings.operatorinfo.connectorflows[0].flows[0].envelope;
          if (envelope) {
            (embeddedComponent as any).connectorflows[0].flows[0].envelope = envelope;
          }
          this.dataProperty.soapsettings.operatorinfo = embeddedComponent;
        }
      }
    });
  }
}
