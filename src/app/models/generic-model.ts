import { v4 as uuid } from 'uuid';
export class GenericModel {
    constructor() {
      this.id = uuid();
    }
  
    // tslint:disable-next-line: variable-name
    c_id?: number;
    id?: string;
    name?: string;
    list?: any;
    total?: any;
  }