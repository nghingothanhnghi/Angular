import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './cleanse-node.component.html',
  styleUrls: ['./cleanse-node.component.scss', '../base-editable-node.component.scss']
})
export class CleanseNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'CLEANSE',
        catype: 'cleanse',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Logics.CLEANSE',
        connectortype: 'DiClientAdapter.Logics.CLEANSE.CLEANSEConnector',
        settings: {
          cleanseAssemply: 'DiClientAdapter.Command.CLEANSE',
          cleanseType: 'DiClientAdapter.Command.CLEANSE.XmlCleanse',
          cleanseWorkingDir: {
            directoryWorkingFrom: '/Out/SOAP/SOAPCommand',
            directoryWorkingTo: '/In/DISK/DISKCommand'
          },
          cleanseDataUsing: {
            id: null,
            name: '',
            profile: []
          },
          cleanseRules: []
        }
      };
    }
  }
}
