import { Component, Input, SimpleChanges } from '@angular/core';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ActivityNodeService, RecipeLayoutService, ComponentService, AuthenticationService } from '~app/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cip-configuration',
  templateUrl: './cip-configuration.component.html',
  styleUrls: ['./cip-configuration.component.scss']
})
export class CipConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;

  configItems: string[] = ['General'];
  activeConfigItemIndex = 0;

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    componentService: ComponentService,
    toastrService: ToastrService
  ) {
    super(activityService, recipeLayoutService, authenService, componentService, toastrService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.data) {
      if (this.dataProperty.settings.action === 'get' && !this.dataProperty.settings.uaDataUsage.toCustomerId) {
        this.dataProperty.settings.uaDataUsage.toCustomerId = this.authenService.currentUserValue.customerId;
      }
    }
  }

  onActionChanged(action: string): void {
    this.dataProperty.catype = action === 'get' ? 'cip_inbound' : 'cip_outbound';
    this.dataProperty.connecttype = action === 'get' ? 'cn' : 'fw';
    this.dataProperty.caassembly = action === 'get' ? 'DiClientAdapter.Notify.CIPInbound' : 'DiClientAdapter.Notify.CIPOutbound';
    this.dataProperty.connectortype = action === 'get' ? 'DiClientAdapter.Notify.CIPInbound.CIPInboundConnector' : '';
    this.dataProperty.forwardertype = action === 'get' ? '' : 'DiClientAdapter.Notify.CIPOutbound.CIPOutboundForwarder';
    this.dataProperty.settings.cipAssemply = action === 'get' ? 'DiClientAdapter.Command.CIPInbound' : 'DiClientAdapter.Command.CIPOutbound';
    this.dataProperty.settings.cipCommandtype = action === 'get' ? 'DiClientAdapter.Command.CIPInbound.CIPCommandInbound' : 'DiClientAdapter.Command.CIPOutbound.CIPCommandOutbound';

    let fromCustomerId = this.dataProperty.settings.uaDataUsage.fromCustomerId;
    this.dataProperty.settings.uaDataUsage.fromCustomerId = this.dataProperty.settings.uaDataUsage.toCustomerId;
    this.dataProperty.settings.uaDataUsage.toCustomerId = fromCustomerId;
  }
}