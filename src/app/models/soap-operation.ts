import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class SoapOperation extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Operation', localType: 'SOAP' }) {
    super(info);

    this.content = {
      // Tab Option
      connectorAction: 'execute',
      object: 'VendorList',
      requestProfile: {
        id: null,
        name: ''
      },
      responseProfile: {
        id: null,
        name: ''
      },
      errorBehavior: false,
      exposeRequestEnvelope: false,
      exposeResponseEnvelope: false,
      attachmentCache: {
        name: ''
      },
      // Others
      connectorflows: [
        {
          flows: [
            {
              envelope: {
                wsdlurl: '',
                body: ''
              },
              operatorname: '',
              parameters: []
            }
          ]
        }
      ],
      // Tab Archiving...
      archiving: {
        archiveDocumentData: false
      },
      tracking: {
        trackedFields: []
      },
      caching: {
        documentCache: {
          id: null,
          name: ''
        }
      }
    };
  }
}
