import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './end-node.component.html',
  styleUrls: ['./end-node.component.scss', '../base-editable-node.component.scss']
})
export class EndNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'End',
        catype: 'end',
        endingType: 'none',
        endingSetting: {
          catype: 'cip_notify',
          connecttype: 'cn',
          caassembly: 'DiClientAdapter.Notify.CIP',
          connectortype: 'DiClientAdapter.Notify.CIP.CIPConnector',
          settings: {
            cipAssemply: 'DiClientAdapter.Command.CIP.Notify',
            cipType: 'DiClientAdapter.Command.CIP.Notify.Request',
            cipDataUsing: {
              name: '',
              callerid: '',
              fullpath: ''
            }
          }
        }
      };
    }
  }
}
