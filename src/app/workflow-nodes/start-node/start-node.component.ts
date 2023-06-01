import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';

import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.scss', '../base-editable-node.component.scss']
})
export class StartNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'Start',
        catype: 'start'
      };
    }
  }
}
