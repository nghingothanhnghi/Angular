// (200506)
import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges,ChangeDetectionStrategy, DoCheck, OnChanges } from '@angular/core';
import { JsonService } from '~app/services/json.service';
import { tooShortCleanRules, tooLongCleanRules, defaultValueCleanRules } from '~app/models/constants';

@Component({
  selector: 'app-element-rules',
  templateUrl: './element-rules.component.html',
  styleUrls: ['./element-rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementRulesComponent implements OnInit, OnChanges {
  @Input() branch: any = {};
  @Input() rule: any = {};
  @Output() ruleChange = new EventEmitter<object>();

  tooShortCleanRules = tooShortCleanRules; 
  tooLongCleanRules = tooLongCleanRules;
  defaultValueCleanRules = defaultValueCleanRules;
  collapses = [false,false,false];
  invalidForm = false;

  constructor(private jsonService:JsonService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rule) {}
  }

  ngDoCheck(){
    if (!this.jsonService.isEmpty(this.rule || !this.jsonService.isEmpty(this.branch)))
      this.ruleChange.emit({rule:this.rule, index:this.branch.index});
  }  

  // (190124.200507)
  invalidateRequired(field): boolean {
    let invalid = false;
    switch (field) {
        case 'rule.minLengOps.padCharacter':
            if (this.rule.minLengOps && (this.rule.minLengOps.ifTooShortAct === 'prep' || this.rule.minLengOps.ifTooShortAct === 'appe')) 
                invalid = (this.rule.minLengOps.padCharacter == null || this.rule.minLengOps.padCharacter.trim() === '');
            break;
        case 'rule.numericDataOps.defaultToValue':
            if (this.rule.numericDataOps && this.rule.numericDataOps.ifNonNumericAct === 'setdv') 
                invalid = (this.rule.numericDataOps.defaultToValue == null || this.rule.numericDataOps.defaultToValue.trim() === '');
            break;
    }
    this.invalidForm = this.invalidForm || invalid;
    return invalid;
  }

}