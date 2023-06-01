import { CleanseRule } from './cleanse-rule';

export class CleanseRuleValidator {

    constructor(private rule: CleanseRule) {
        if (this.rule == null) {
            throw Error('Argument null exception. Argument: rule')
        }
    }

    errors: { [key: string]: string } = {};

    get hasError(): boolean {
        for (let key in this.errors) {
            if (this.errors.hasOwnProperty(key) && this.errors[key]) {
                return true;
            }
        }

        return false;
    }

    validationCallback: Function;

    validate(property: string): void {
        let hasError: boolean = false;
        switch (property) {
            case 'padCharacter':
                if (this.rule.minLengOps.ifTooShortAct === 'prep' || this.rule.minLengOps.ifTooShortAct === 'appe') {
                    hasError = this.rule.minLengOps.padCharacter == null || this.rule.minLengOps.padCharacter.trim() === '';
                    this.errors.padCharacter = hasError ? 'Required' : '';
                }
                else {
                    this.errors.padCharacter = '';
                }
                break;

            case 'defaultToValue':
                if (this.rule.numericDataOps.ifNonNumericAct === 'setdv') {
                    hasError = this.rule.numericDataOps.defaultToValue == null || this.rule.numericDataOps.defaultToValue.trim() === '';
                    this.errors.defaultToValue = hasError ? 'Required' : '';
                }
                else {
                    this.errors.defaultToValue = '';
                }
                break;
        }

        if (this.validationCallback) {
            this.validationCallback(this, property, hasError);
        }
    }
}