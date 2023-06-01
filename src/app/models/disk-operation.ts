import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class DiskOperation extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Operation', localType: 'Disk' }) {
    super(info);

    this.content = {
      // Tab Option
      action: 'get',
      get: {
        fileFilter: null,
        fileMatchingType: null,
        maxFilesToRead: 0, //(191224)
        delFilesAfterReading: false,
        failIfUnableToDelete: false
      },
      send: {
        createDirIfNotExist: false,
        fileOption: null
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
