import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


import { ActivityNodeService} from '../services/activity-node.service';
import { RecipeLayoutService} from '../services/recipe-layout.service';
import { LayoutAction } from '../models/layout-action';

@Component({
  selector: 'app-activity-configuration',
  templateUrl: './activity-configuration.component.html',
  styleUrls: ['./activity-configuration.component.css']
})
export class ActivityConfigurationComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  activityData: any = { property: { catype: '' } };
  constructor(    
    private _activityService: ActivityNodeService,
    private _recipeLayoutService: RecipeLayoutService
    ) { }

    ngOnInit(): void {
      // Listen activity configuration event
      this._subscriptions.push(this._activityService.activityConfiged$.subscribe(data => {
        this._recipeLayoutService.layout({ action: LayoutAction.Show, part: 'Configuration' });
        this.activityData = data;
      }));
  
      this._subscriptions.push(this._activityService.activityClosed$.subscribe(() => {
        this._recipeLayoutService.layout({ action: LayoutAction.Hide, part: 'Configuration' });
        this.activityData = { property: { catype: '' } };
      }));
    }
  
    ngOnDestroy() {
      // prevent memory leak when component destroyed
      this._subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }

}
