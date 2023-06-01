import { ComponentModel } from '../models/component';
import { Recipe } from '../models/recipe';
import { XmlProfile } from '../models/xml-profile';
import { JsonProfile } from '../models/json-profile';
import { ProfileMap } from '../models/profile-map';
import { SoapOperation } from '../models/soap-operation';
import { HttpClientOperation } from '../models/http-client-operation';
import { DiskOperation } from '../models/disk-operation';
import { SoapConnection } from '../models/soap-connection';
import { DiskConnection } from '../models/disk-connection';
import { HttpClientConnection } from '../models/http-client-connection';
import { Map } from '../models/map';
import { CreationComponentInfo } from './creation-component-info';

export class ComponentFactory {
  create(info: CreationComponentInfo): ComponentModel {
    let id: string = info.type.toLowerCase() + '|' + info.localType.toLowerCase();
    let component: ComponentModel;
    switch (id) {
      case 'process|process':
        component = new Recipe(info);
        break;
      case 'map|map-profile':
        component = new ProfileMap(info);
        break;
      case 'map|map':
        component = new Map(info);
        break;
      case 'profile|xml':
        component = new XmlProfile(info);
        break;
      case 'operation|soap':
        component = new SoapOperation(info);
        break;
      case 'operation|disk':
        component = new DiskOperation(info);
        break;
      case 'operation|httpclient':
        component = new HttpClientOperation(info);
        break;
      case 'connection|soap':
        component = new SoapConnection(info);
        break;
      case 'connection|disk':
        component = new DiskConnection(info);
        break;
      case 'connection|httpclient':
        component = new HttpClientConnection(info);
        break;
      default:
        component = new Recipe(info);
        break;
    }

    return component;
  }
}
