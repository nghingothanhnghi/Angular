import { Expose, Type } from 'class-transformer';

import { CleanseRule } from './cleanse-rule';
import { ProfileNode } from './profile-node';

export class JsonProfileNode extends ProfileNode {
    @Expose() valueType: string;

    @Expose()
    @Type(() => JsonProfileNode)
    children: JsonProfileNode[];

    prepare(): void { }

    getIdentity(): string {
        return '';
    }

    createRule(): CleanseRule {
        return null;
    }
}