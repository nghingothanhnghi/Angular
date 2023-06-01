import { GenericModel } from './generic-model';
import { CreationComponentInfo } from './creation-component-info';
// tslint:disable: variable-name
export class ComponentModel extends GenericModel {
    constructor(info?: CreationComponentInfo) {
      super();
  
      this.type = info?.type;
      this.localType = info?.localType;
      this.name = info?.name;
      this.customerId = info?.customerId || '';
      this.customer_key = info?.customerKey || '';
      this.isLibrary = info?.isLibrary || false;
    }
  
    status: any = null;
    isNew = false;
    type: string;
    localType: string;
    isLibrary: boolean;
    customer_key: string;
    customerId: string;
    data: any;
    content: any;
    ownerId: string;
    mapID: string;
    clone = false;
  }