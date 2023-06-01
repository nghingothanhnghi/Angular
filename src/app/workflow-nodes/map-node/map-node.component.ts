import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './map-node.component.html',
  styleUrls: ['./map-node.component.scss', '../base-editable-node.component.scss']
})
export class MapNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'MAP',
        catype: 'map',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Logics.DiUniteMAP',
        connectortype: 'DiClientAdapter.Logics.DiUniteMAP.DiUniteMAPConnector',
        settings: {
          diUniteMapAssemply: 'DiClientAdapter.Command.DiUniteMAP',
          diUniteMapType: 'DiClientAdapter.Command.DiUniteMAP.XmlMap',
          diUniteMapWorkingDir: {
            directoryWorkingFrom: '/Out/SOAP/SOAPCommand',
            directoryWorkingTo: '/In/SOAP/SOAPCommand'
          },
          diUniteMapDataUsing: {
            id: null,
            name: null,
            mapID: null,
            useDiUniteMap: false
          },
          tracing: []
        }
      };
    }
  }
}
