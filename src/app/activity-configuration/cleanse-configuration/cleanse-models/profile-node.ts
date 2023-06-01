import { Expose, Exclude } from 'class-transformer';
import { CleanseRule } from './cleanse-rule';

export abstract class ProfileNode {
    @Expose() label: string;
    @Expose() title: string;
    @Expose() fieldLengthValidation: boolean;
    @Expose() minLength: number;
    @Expose() maxLength: number;
    @Expose() dataType: string;
    @Expose() dateFormat: string;
    @Expose() numberFormat: string;
    @Expose() signed: string;
    @Expose() impliedDecimals: string;
    @Expose() level: number;
    @Expose() expanded: boolean;
    @Expose() children: ProfileNode[];
    @Exclude({ toPlainOnly: true }) hasError: boolean;

    isExpandable(): boolean {
        return this.children && this.children.length > 0;
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }

    abstract prepare(): void;
    abstract getIdentity(): string;
    abstract createRule(): CleanseRule;
}