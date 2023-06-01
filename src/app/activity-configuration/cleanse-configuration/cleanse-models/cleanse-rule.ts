import { Expose, Exclude } from 'class-transformer';
import { CleanseRuleValidator } from './cleanse-rule-validator';

export interface MinLengthOptions {
    ifTooShortAct: string;
    padCharacter: string;
}

export interface MaxLengthOptions {
    ifTooLongAct: string;
}

export interface NumericDataOptions {
    ifNonNumericAct: string;
    defaultToValue: string;
    dateFormat: string;
    numberFormat: string;
    signed: string;
    impliedDecimals: string;
}

export class CleanseRule {

    constructor() {
        this.minLeng = 0;
        this.maxLeng = 0;

        this.minLengOps = {
            ifTooShortAct: 'reje',
            padCharacter: ''
        };

        this.maxLengOps = {
            ifTooLongAct: 'reje'
        };

        this.numericDataOps = {
            ifNonNumericAct: 'reje',
            defaultToValue: '',
            dateFormat: "MMddyyyy",
            numberFormat: "#,###,###,##0.00",
            signed: null,
            impliedDecimals: null
        };
    }

    @Exclude({ toPlainOnly: true }) private _validator: CleanseRuleValidator;
    get validator(): CleanseRuleValidator {
        if (this._validator == null) {
            this._validator = new CleanseRuleValidator(this);
        }
        return this._validator
    };

    @Expose() xPath: string;
    @Expose() dataType: string;
    @Expose() minLeng: number;
    @Expose() maxLeng: number;
    @Expose() minLengOps: MinLengthOptions;
    @Expose() maxLengOps: MaxLengthOptions;
    @Expose() numericDataOps: NumericDataOptions;
    @Expose() fieldLengthValidation: boolean;
}