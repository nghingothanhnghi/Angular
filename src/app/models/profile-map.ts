import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class ProfileMap extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Map', localType: 'map-profile' }) {
    super(info);

    this.localType = info?.useDiUniteMap ? 'map' : 'map-profile';
    this.data = {
      useDiUniteMap: info.useDiUniteMap,
      mapID: info.mapID
    };
  }
}
