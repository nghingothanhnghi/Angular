import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';
import { Element} from './ielement';
import { Namespace} from './inamespace';

export class XmlProfile extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Profile', localType: 'Xml' }) {
    super(info);

    this.content = JSON.stringify({   // (200312)
      profile: [ new Element() ],
      namespaces: [ new Namespace()],
      option: {
          "endcoding": "utf8",
          "respectMinOccurs": false
      },
      xmlReduction:''
    });
  }
}
