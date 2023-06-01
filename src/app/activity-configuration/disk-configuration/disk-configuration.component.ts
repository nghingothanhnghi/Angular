import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ComponentService} from '../../services/component.service';
import { AuthenticationService} from '../../services/authentication.service';
import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

import { ComponentModel } from '../../models/component';

@Component({
  selector: 'app-disk-configuration',
  templateUrl: './disk-configuration.component.html',
  styleUrls: ['./disk-configuration.component.scss']
})
export class DiskConfigurationComponent extends BaseNodeConfigurationComponent {
  @Input() data: any;
  private _subscriptions: Subscription[] = [];
  configItems: string[] = ['General'];
  activeConfigItemIndex = 0;
  connections$: Observable<ComponentModel[]>;
  operations$: Observable<ComponentModel[]>;

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    toastrService: ToastrService,
    componentService: ComponentService
  ) {
    super(activityService, recipeLayoutService, authenService, componentService, toastrService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.data) {
      this.getListComponent();

      this._subscriptions.push(this.componentService.componentSaved$.subscribe((component: ComponentModel) => {
        if (!component.clone && component.ownerId !== this.data.id) return;
        this.componentService.closeComponent(component.id);

        switch (component.type) {
          case 'Operation':
            this.dataProperty.disksettings.operatorinfo = this.createCloneComponent(component);
            break;
          case 'Connection':
            this.dataProperty.disksettings.connectioninfo = this.createCloneComponent(component);
            break;
        }
        this.getListComponent();
        this.toastrService.success(`Save ${component.name} ${component.type} to Disk Property successful`);
      }));
    }
  }

  private getListComponent() {
    this.connections$ = this.componentService.getComponentsByTypeWithDefault(
      'Connection',
      'Disk',
      this.dataProperty.disksettings.connectioninfo
    );
    this.operations$ = this.componentService.getComponentsByTypeWithDefault(
      'Operation',
      'Disk',
      this.dataProperty.disksettings.operatorinfo
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  onConnectionChanged(id: string) {
    this.embedComponentToItem(id, true);
  }

  onOperationChanged(id: string) {
    this.embedComponentToItem(id, false);
  }

  private embedComponentToItem(componentId: string, isConnection: boolean = false) {
    this.componentService.getComponent(componentId).subscribe(component => {
      if (component.content) {
        const embeddedComponent = this.createCloneComponent(component);
        if (isConnection) {
          this.dataProperty.disksettings.connectioninfo = embeddedComponent;
        } else {
          this.dataProperty.disksettings.operatorinfo = embeddedComponent;
        }
      }
    });
  }
}
