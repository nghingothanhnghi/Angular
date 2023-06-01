import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './disk-node.component.html',
  styleUrls: ['./disk-node.component.scss', '../base-editable-node.component.scss']
})
export class DiskNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'DISK',
        catype: 'disk',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Connectors.DISK',
        connectortype: 'DiClientAdapter.Connectors.DISK.DISKConnector',
        forwardertype: 'DiClientAdapter.Connectors.DISK.DISKForwarder',
        disksettings: {
          diskassemply: 'DiClientAdapter.Command.DISK',
          diskcommandtype: 'DiClientAdapter.Command.DISK.DISKCommand',
          action: 'get',
          connectioninfo: {
            id: null,
            name: '',
            physicpath: '',
            directory: ''
          },
          operatorinfo: {
            id: null,
            name: '',
            action: 'get',
            get: {
              fileFilter: '',
              fileMatchingType: 'wcard',
              maxFilesToRead: 0,
              delFilesAfterReading: false,
              failIfUnableToDelete: false
            },
            send: {
              createDirIfNotExist: true,
              fileOption: 'app'
            }
          }
        }
      };
    }
  }
}
