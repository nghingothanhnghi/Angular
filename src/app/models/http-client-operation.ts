import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class HttpClientOperation extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Operation', localType: 'httpclient' }) {
    super(info);

    this.content = {
      connectionAction: 'get', // get, send
      requestProfileType: '', // json, xml
      requestProfile: {
        id: null,
        name: ''
      },
      responseProfileType: '', // json, xml
      responseProfile: {
        id: null,
        name: ''
      },
      // tslint:disable-next-line: max-line-length
      // text/plain text/xml text/html application/binary application/edifact application/edi-x12 application/xml application/json application/x-www-form-urlencoded
      contentType: 'text/plain',
      httpMethod: 'get', // get, post, put, delete
      requestHeaders: [], // {name:"",value:""}
      resourcePath: [], // {name:"",value:""}
      responseHeadersMapping: [] // {name:"",value:""}
    };
  }
}
