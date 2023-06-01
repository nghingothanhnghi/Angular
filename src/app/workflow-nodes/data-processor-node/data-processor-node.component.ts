import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  selector: 'app-data-processor-node',
  templateUrl: './data-processor-node.component.html',
  styleUrls: ['./data-processor-node.component.scss', '../base-editable-node.component.scss']
})
export class DataProcessorNodeComponent extends BaseEditableNodeComponent {

  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'Data Processor',
        catype: 'data-processor',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Logics.DataProcessor',
        connectortype: 'DiClientAdapter.Logics.DataProcessor.DataProcessorConnector',
        dataProcessorAssemply: 'DiClientAdapter.Command.DataProcessor',
        dataProcessorCommandType: 'DiClientAdapter.Command.DataProcessor.DataProcessorCommand',
        steps: []
      };
    }
  }

}
