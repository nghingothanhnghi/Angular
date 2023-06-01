import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { plainToClass, classToPlainFromExist, Type } from 'class-transformer';
import { Profile, CleanseRule, ProfileNode, prepareProfile, CleanseRuleValidator } from '../cleanse-models';

@Component({
  selector: 'app-cleanse-rules',
  templateUrl: './cleanse-rules.component.html',
  styleUrls: ['./cleanse-rules.component.scss']
})
export class CleanseRulesComponent implements OnInit, OnChanges {

  @Input() profile: Profile; // Plain Profile
  @Input() rules: CleanseRule[]; // Plain Cleanse Rule
  @Input() validationResult: { [key: string]: boolean };

  realProfile: Profile; // class Profile
  selectedProfileNode: ProfileNode;
  @Type(() => CleanseRule)
  realRules: CleanseRule[]; // class Cleanse Rule
  rule: CleanseRule;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedProfileNode = null;
    this.rule = null;
    this.rules = this.rules || [];

    if (this.profile) {
      prepareProfile(this.profile);
      this.realProfile = plainToClass(Profile, this.profile, { excludeExtraneousValues: true });
      this.realProfile.prepare().fillRules(this.rules);
      this.realRules = plainToClass(CleanseRule, this.rules, { excludeExtraneousValues: true });
    }
  }

  selectNode(node: ProfileNode): void {
    this.selectedProfileNode = node;
    this.rule = this.realRules.find(x => x.xPath === node.getIdentity());
    if (!this.rule.validator.validationCallback) {
      this.rule.validator.validationCallback = (validator: CleanseRuleValidator) => {
        this.selectedProfileNode.hasError = validator.hasError;
        this.validationResult.cleanseRulesValid = !this.realRules.some(x => x.validator.hasError);
      };
    }
  }

  onSave(): void {
    classToPlainFromExist(this.realRules, this.rules);
  }
}
