import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './http-client-node.component.html',
  styleUrls: ['./http-client-node.component.scss', '../base-editable-node.component.scss']
})
export class HttpClientNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        catype: 'httpclient',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Connectors.HTTPCLIENT',
        connectortype: 'DiClientAdapter.Connectors.HTTPCLIENT.HttpClientConnector',
        forwardertype: 'DiClientAdapter.Connectors.HTTPCLIENT.HttpClientForwarder',
        displayedName: 'Http Client',
        action: 'get',
        httpClientSettings: {
          httpClientAssemply: 'DiClientAdapter.Command.HTTPCLIENT',
          httpClientCommandtype: 'DiClientAdapter.Command.HTTPCLIENT.HttpClientCommand',
          parameters: [],
          connectioninfo: {
            id: null
          },
          operatorinfo: {
            id: null,
            httpMethod: 'get',
            responseProfileType: ''
          }
        },
        retry: {
          retryWithErrorTypes: '',
          retryNumber: 0,
          timeOut: 10,
          sleepTimeBF: 2
        }
      };
    }
  }
}
