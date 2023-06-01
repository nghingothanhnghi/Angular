import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class DiskConnection extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Connection', localType: 'Disk' }) {
    super(info);

    this.content = {
      directory: ''
    };
  }
}
