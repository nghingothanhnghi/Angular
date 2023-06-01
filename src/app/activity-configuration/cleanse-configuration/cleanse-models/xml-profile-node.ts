import { Expose, Type } from 'class-transformer';

import { ProfileNode } from './profile-node';
import { CleanseRule } from './cleanse-rule';

export class XmlProfileNode extends ProfileNode {
    @Expose() prefix: string;
    @Expose() namespace: string;
    @Expose() typeName: string;
    @Expose() comments: string;
    @Expose() minOccurs: number;
    @Expose() maxOccurs: number;
    @Expose() loopingOption: string;
    @Expose() namespaceDeclarations: string[];
    @Expose() xPath: string;

    @Expose()
    @Type(() => XmlProfileNode)
    children: XmlProfileNode[];

    prepare(): void {
        this.setXPath(this, '');
    }

    getIdentity(): string {
        return this.xPath;
    }

    createRule(): CleanseRule {
        let rule: CleanseRule = null;
        if (this.xPath && (this.fieldLengthValidation || this.dataType != 'c')) {
            rule = new CleanseRule();
            rule.xPath = this.xPath;
            rule.dataType = this.dataType;
            rule.minLeng = this.minLength;
            rule.maxLeng = this.maxLength;
            rule.fieldLengthValidation = this.fieldLengthValidation;
            rule.numericDataOps.dateFormat = this.dateFormat;
            rule.numericDataOps.numberFormat = this.numberFormat;
            rule.numericDataOps.signed = this.signed;
            rule.numericDataOps.impliedDecimals = this.impliedDecimals;
        }

        return rule;
    }

    private setXPath(node: XmlProfileNode, parentXPath: string): void {
        if (node) {
            node.xPath = parentXPath + this.createPrefixElementName(node.label, node.namespace);
            if (node.children) {
                node.children.forEach(child => {
                    this.setXPath(child as XmlProfileNode, node.xPath);
                });
            }
        }
    }

    private createPrefixElementName(name, namespace): string {
        return '/' + ((namespace === undefined || namespace == null || namespace.trim() == '') ? '' : (namespace + ':')) + name;
    }
}