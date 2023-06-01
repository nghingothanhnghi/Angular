import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './cip-node.component.html',
  styleUrls: ['./cip-node.component.scss', '../base-editable-node.component.scss']
})
export class CipNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        catype: 'cip_inbound',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Notify.CIPInbound',
        connectortype: 'DiClientAdapter.Notify.CIPInbound.CIPInboundConnector',
        forwardertype: '',
        displayedName: 'Cloud Interchange Platform',
        settings: {
          cipAssemply: 'DiClientAdapter.Command.CIPInbound',
          cipCommandtype: 'DiClientAdapter.Command.CIPInbound.CIPCommandInbound',
          action: 'get',
          cipDataUsage: {
            callerId: '',
            fromCustomerId: '',
            toCustomerId: '',
            transactionId: '',
            transactionKey: '',
            filePath: ''
          },
          uaDataUsage: {
            callerId: '',
            fromCustomerId: '',
            toCustomerId: '',
            transactionId: '',
            transactionKey: '',
            filePath: ''
          }
        }
      };
    }
  }
}
