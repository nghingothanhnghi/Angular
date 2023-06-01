import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './notify-node.component.html',
  styleUrls: ['./notify-node.component.scss', '../base-editable-node.component.scss']
})
export class NotifyNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        displayedName: 'Notify',
        catype: 'notify',
        endingType: 'email_alert',
        title: '',
        messageLevel: 'Error',
        message: ''
        //reportMailAlerts: false
      };
    }
  }
}
