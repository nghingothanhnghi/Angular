import { Expose, Type } from 'class-transformer';

import { ProfileNode } from './profile-node';
import { XmlProfileNode } from './xml-profile-node';
import { JsonProfileNode } from './json-profile-node';
import { CleanseRule } from './cleanse-rule';

export class Profile {
    @Expose() id: string;
    @Expose() type: string;
    @Expose() localType: string;
    @Expose() name: string;

    @Expose()
    @Type(() => ProfileNode, {
        discriminator: {
            property: "__type",
            subTypes: [
                { value: XmlProfileNode, name: "xml_node" },
                { value: JsonProfileNode, name: "json_node" }
            ]
        }
    })
    private profile: ProfileNode[];

    get profileNodes(): ProfileNode[] {
        return this.profile;
    }

    prepare(): Profile {
        if (this.profileNodes) {
            this.profileNodes.forEach(node => {
                node.prepare();
            });
        }

        return this;
    }

    fillRules(rules: CleanseRule[]): Profile {
        if (rules == null) {
            rules = [];
        }

        if (this.profileNodes) {
            this.profileNodes.forEach(node => {
                this.fillRulesInternal(node, rules);
            });
        }

        return this;
    }

    private fillRulesInternal(profileNode: ProfileNode, rules: CleanseRule[]): void {
        let rule = rules.find(x => x.xPath === profileNode.getIdentity());
        if (!rule) {
            rule = profileNode.createRule();
            if (rule) {
                rules.push(rule);
            }
        }
        else {
            rule.xPath = profileNode.getIdentity();
            rule.dataType = profileNode.dataType;
            rule.minLeng = profileNode.minLength;
            rule.maxLeng = profileNode.maxLength;
            rule.fieldLengthValidation = profileNode.fieldLengthValidation;
            rule.numericDataOps.dateFormat = profileNode.dateFormat;
            rule.numericDataOps.numberFormat = profileNode.numberFormat;
            rule.numericDataOps.signed = profileNode.signed;
            rule.numericDataOps.impliedDecimals = profileNode.impliedDecimals;
        }

        if (profileNode.children) {
            profileNode.children.forEach(child => {
                this.fillRulesInternal(child, rules);
            });
        }
    }
}