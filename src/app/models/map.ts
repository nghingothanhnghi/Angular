import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class Map extends ComponentModel {
    constructor(info: CreationComponentInfo = { type: 'Map', localType: 'map' }) {
        super(info);

        this.localType = 'map';
        this.data = {
            useDiUniteMap: info.useDiUniteMap,
            mapID: info.mapID
        };
    }
}
