import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class SoapConnection extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Connection', localType: 'SOAP' }) {
    super(info);

    this.content = {
      wsdlurl: '',
      soapendpointurl: '',
      securitytype: 'none',
      username: null,
      password: null,
      clientSslCertificate: {
        id: null,
        name: ''
      },
      trustSslServerCertificate: {
        id: null,
        name: ''
      }
    };
  }
}
