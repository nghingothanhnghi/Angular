import { Component, Input, OnInit, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';
import { ActivityNodeService, ComponentService, RecipeLayoutService, AuthenticationService, FancyTreeService, LoaderSpinnerService, ComponentExtService, MapService } from '~app/services';
import { ComponentModel } from '~app/models';
import { CleanseRulesComponent } from './cleanse-rules/cleanse-rules.component';
import { ProfileRule } from '~app/models/profile-rule';

import { $, fancytree, cleanseTypes } from '~app/models/constants';

@Component({
  selector: 'app-cleanse-configuration',
  templateUrl: './cleanse-configuration.component.html',
  styleUrls: ['./cleanse-configuration.component.scss']
})
export class CleanseConfigurationComponent extends BaseNodeConfigurationComponent {
  @ViewChild(CleanseRulesComponent) cleanseRulesComponent;
  @Input() data: any;

  _subscriptions: Subscription[] = [];
  configItems: string[] = ['General'];
  activeConfigItemIndex = 0;
  profiles: any[];
  component$: Subscription;
  validationResult: { [key: string]: boolean } = {};

  cleanseTypes = cleanseTypes;
  cleanseType: string;

  // Cleanse Data Using
  profileNameFilter = '';
  profileNames: any[] = [];
  selectedProfileNameNode: any = {};

  // Tree profile
  profile: any[] = [];
  branch: any;
  rule: any;
  nodeNameFilter: string = '';

  // Fancy tree
  notifyFilterProfileName = '';
  filterOption = {
    autoApply: true,   // Re-apply last filter if lazy data is loaded
    autoExpand: false, // Expand all branches that contain matches while filtered
    counter: true,     // Show a badge with number of matching child nodes near parent icons
    fuzzy: true,       // Match single characters in order, e.g. 'fb' will match 'FooBar'
    hideExpandedCounter: true,  // Hide counter badge if parent is expanded
    hideExpanders: false,       // Hide expanders if all child nodes are hidden by filter
    highlight: true,   // Highlight matches by wrapping inside <mark> tags
    leavesOnly: true,  // Match end nodes only
    nodata: false,     // Display a 'no data' status node if result is empty
    mode: 'dimm'       // Grayout unmatched nodes (pass 'hide' to remove unmatched node instead)
  };

  componentExtService;
  fancyTreeService;
  loaderSpinnerService;
  mapService;
  placeholder='Choose profile...';

  constructor(
    activityService: ActivityNodeService,
    recipeLayoutService: RecipeLayoutService,
    authenService: AuthenticationService,
    componentService: ComponentService,
    toastrService: ToastrService,
    componentExtService: ComponentExtService,
    fancyTreeService: FancyTreeService,
    loaderSpinnerService: LoaderSpinnerService,
    mapService: MapService
  ) {
    super(activityService, recipeLayoutService, authenService, componentService, toastrService);
    this.componentExtService = componentExtService;
    this.fancyTreeService = fancyTreeService;
    this.loaderSpinnerService = loaderSpinnerService;
    this.mapService = mapService;
  }


  // (200416)
  ngAfterViewInit() {
    $(document).ready(function () {
      setTimeout(() => {
        });
    }, 5000);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.validationResult.cleanseRulesValid = true;
    const subscription$ = this.componentService.componentSaved$.subscribe((component: ComponentModel) => {
      if (!component.clone && component.ownerId !== this.data.id)
        return;
      this.componentService.closeComponent(component.id);

      switch (component.localType) {
        case 'Xml':
          this.getProfiles(this.dataProperty.settings.cleanseType);
          this.dataProperty.settings.cleanseDataUsing = this.createCloneComponent(component);
          break;
        case 'json':
          let type = this.cleanseTypes.find(a => a.value === this.dataProperty.settings.cleanseType).type;
          this.getProfileNames(type);   // (200429)
          console.log(this.dataProperty.settings.cleanseDataUsing);
          break;
      }
      this.toastrService.success(`Save ${component.name} ${component.type} to Cleanse Property successful`);
    });
    this._subscriptions.push(subscription$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.data) {
      let type = this.cleanseTypes.find(a => a.value === this.dataProperty.settings.cleanseType).type;
      if (type === 'Xml')
        this.getProfiles(this.dataProperty.settings.cleanseType);
      else
        this.getProfileNames(type);   // (200429)
    }
    console.log(this.dataProperty.settings.cleanseDataUsing);
    this.profileNameFilter = '';
    this.resetBranch();
    this.rule = {};
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    let type = this.cleanseTypes.find(a => a.value === this.dataProperty.settings.cleanseType).type;
    if (type === 'Xml'){
      this._subscriptions.forEach(subscription => subscription.unsubscribe());
      this.component$.unsubscribe();
    }
  }

  onProfileTypeChanged(profileType: string): void {
    let type = this.cleanseTypes.find(a => a.value === profileType).type;
    if (type === 'Xml')
      this.getProfiles(profileType, true);
    else
      this.getProfileNames(type);   // (200429)
  }

  onProfileChanged(id: string): void {
    this.embedComponentToItem(id);
  }

  private getProfiles(profileType: string, clearOption = false): void {
    const type = 'Profile';
    const localType = profileType
      .toLowerCase()
      .split('.')
      .pop()
      .replace('cleanse', '');

    if (clearOption) this.dataProperty.settings.cleanseDataUsing.id = null;
    this.component$ = this.componentService
      .getComponentsByTypeWithDefault(type, localType, this.dataProperty.settings.cleanseDataUsing)
      .subscribe(data => {
        this.profiles = data;
      });
  }

  private embedComponentToItem(componentId: string) {
    this.componentService.getComponent(componentId).subscribe(component => {
      if (component.content) {
        const embeddedComponent = this.createCloneComponent(component);
        this.dataProperty.settings.cleanseDataUsing = embeddedComponent;
      }
    });
  }

  save(): void {
    let type = this.cleanseTypes.find(a => a.value === this.dataProperty.settings.cleanseType).type;
    console.log(this.dataProperty.settings);
    if (type === 'Xml')
      (this.cleanseRulesComponent as CleanseRulesComponent).onSave();
    super.save();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // (190426) Reset branch
  resetBranch() {
    this.branch = {};
    this.branch.fieldLengthValidation = false;
    this.branch.dataType = 'c';
  }

  // (191009.200505) Load tree of profile names
  getProfileNames(localType:string) {
    let name = this.profileNameFilter;
    let componentType = 'Profile';
    this.componentExtService.loadComponentsTreeData(name, componentType, localType).then(
      (treeData: any[]) => {
        this.profileNames.length = 0;
        this.profileNames = treeData;
      },
      (e) => {
        console.error(e);
        this.toastrService.error('Load list of request profiles failed');
      }
    );
  }

  // (200409)
  onSelectProfileNameNode($event) {
    this.selectedProfileNameNode = $event;
    let branch = this.selectedProfileNameNode.data;
    this.componentExtService.createEmbedComponentFromComponentId(branch.component_id,'').then(
      (embedComponent:any) => {
        this.dataProperty.settings.cleanseDataUsing = embedComponent;
        this.mapService.setMapDiProfile(this.dataProperty.settings.cleanseDataUsing.profile, 0, '');
        console.log(this.dataProperty.settings.cleanseDataUsing.profile);
        this.resetBranch();
        this.initRule();
        console.log('this.dataProperty.settings.cleanseDataUsing',this.dataProperty.settings.cleanseDataUsing);
      },
      (e) => {
        console.error(e);
        this.toastrService.error(e);
      }
    );
  }

  // (200409.0511) data of Fancytree node $event
  onSelectProfileNode($event) {
    let key = $event.key;
    this.branch = $event.data;
    let index = this.dataProperty.settings.cleanseRules.findIndex(a => a.key === key);
    this.rule = (index >= 0) ? this.dataProperty.settings.cleanseRules[index] : {};
    this.branch.index = index;
    this.nodeNameFilter = '';
  }

  // (200409)
  onRuleChange($event) {
    if ($event){
      this.rule = $event.rule;
      let index = $event.index;
      this.dataProperty.settings.cleanseRules[index] = this.rule;
    }
  }

  // (190110) Profile rule
  initRule() {
    this.dataProperty.settings.cleanseRules.length = 0;
    console.log(this.dataProperty.settings.cleanseDataUsing.profile);
    this.travelProfileTreeSetJsonRules(this.dataProperty.settings.cleanseDataUsing.profile);
    console.log(this.dataProperty.settings.cleanseRules);
  }

  // (190321.200427.0511) Travel Profile Tree JSON to set Rule for Cleanse
  travelProfileTreeSetJsonRules(obj) {
    for (let key in obj) {
      // property has Cleanse rule
      if (obj[key].key && obj[key].valueType === 's' && (obj[key].fieldLengthValidation || obj[key].dataType !== 'c')) {
          let i = this.dataProperty.settings.cleanseRules.findIndex(a => a.key === obj[key].key);
          if (i < 0) {    // Add new this.dataProperty.settings.cleanseRules
              let rule = new ProfileRule(obj[key].fieldLengthValidation,obj[key].dataType);
              if (obj[key].fieldLengthValidation && obj[key].dataType != 'c') {  // numeric or date
                  rule.key = obj[key].key;
                  rule.minLeng = obj[key].minLength;
                  rule.maxLeng = obj[key].maxLength;

                  rule.dataType = obj[key].dataType;
                  rule.numericDataOps.dateFormat = obj[key].dateFormat;
                  rule.numericDataOps.numberFormat = obj[key].numberFormat;
                  rule.numericDataOps.signed = obj[key].signed;
                  rule.numericDataOps.impliedDecimals = obj[key].impliedDecimals;
                  this.dataProperty.settings.cleanseRules.push(rule);
              }
              else if (obj[key].fieldLengthValidation) {        // char
                  rule.key = obj[key].key;
                  rule.minLeng = obj[key].minLength;
                  rule.maxLeng = obj[key].maxLength;
                  this.dataProperty.settings.cleanseRules.push(rule);
              }
              else if (obj[key].dataType !== 'c') {    // numeric or date
                  rule.key = obj[key].key;
                  rule.dataType = obj[key].dataType;
                  rule.numericDataOps.dateFormat = obj[key].dateFormat;
                  rule.numericDataOps.numberFormat = obj[key].numberFormat;
                  rule.numericDataOps.signed = obj[key].signed;
                  rule.numericDataOps.impliedDecimals = obj[key].impliedDecimals;
                  this.dataProperty.settings.cleanseRules.push(rule);
              }
          }
          else {  // Update this.dataProperty.settings.cleanseRules (minLength, maxLength)
              this.dataProperty.settings.cleanseRules[i].minLeng = obj[key].minLength;
              this.dataProperty.settings.cleanseRules[i].maxLeng = obj[key].maxLength;
          }
      }
      if (obj[key].children && obj[key].children.length > 0)
          this.travelProfileTreeSetJsonRules(obj[key].children);
    }
  }
}
