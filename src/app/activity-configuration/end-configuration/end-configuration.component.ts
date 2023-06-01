import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ComponentService} from '../../services/component.service';
import { AuthenticationService} from '../../services/authentication.service';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';



@Component({
  selector: 'app-end-configuration',
  templateUrl: './end-configuration.component.html',
  styleUrls: ['./end-configuration.component.scss']
})
export class EndConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;
  configItems: string[] = ['General'];
  activeConfigItemIndex: number = 0;

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    componentService: ComponentService,
    toastrService: ToastrService
  ) {
    super(activityService, recipeLayoutService, authenService, componentService, toastrService);
  }
}
