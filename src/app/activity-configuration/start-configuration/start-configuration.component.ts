import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ComponentService, RecipeLayoutService, AuthenticationService, ActivityNodeService } from '~app/services';

@Component({
  selector: 'app-start-configuration',
  templateUrl: './start-configuration.component.html',
  styleUrls: ['./start-configuration.component.scss']
})
export class StartConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;

  configItems: string[] = ['General'];
  activeConfigItemIndex: number = 0;

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    toastrService: ToastrService,
    componentService: ComponentService
  ) {
    super(activityService, recipeLayoutService, authenService, componentService, toastrService);
  }
}
