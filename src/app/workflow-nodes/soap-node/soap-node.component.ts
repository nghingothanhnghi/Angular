import { Component } from '@angular/core';
import { BaseEditableNodeComponent } from '../base-editable-node.component';

import { ActivityNodeService} from '../../services/activity-node.service';
import { RecipeLayoutService} from '../../services/recipe-layout.service';

@Component({
  templateUrl: './soap-node.component.html',
  styleUrls: ['./soap-node.component.scss', '../base-editable-node.component.scss']
})
export class SoapNodeComponent extends BaseEditableNodeComponent {
  constructor(activityService: ActivityNodeService, recipeLayoutService: RecipeLayoutService) {
    super(activityService, recipeLayoutService);
  }

  protected initDefaultData(): void {
    let data = this.getNode().data;
    if (!data.property) {
      data.property = {
        catype: 'soap',
        connecttype: 'cn',
        caassembly: 'DiClientAdapter.Connectors.SOAP',
        connectortype: 'DiClientAdapter.Connectors.SOAP.SOAPConnector',
        forwardertype: 'DiClientAdapter.Connectors.SOAP.SOAPForwarder',
        displayedName: 'SOAP Service',
        otherOption: false,
        soapsettings: {
          action: 'execute',
          headers: [],
          soapassemply: 'DiClientAdapter.Command.SOAP.Envelope',
          soapcommandtype: 'DiClientAdapter.Command.SOAP.Envelope.EnvelopeCommand',
          soaptype: 'enve',
          connectioninfo: {
            id: null,
            name: '',
            wsdlurl: '',
            soapendpointurl: '',
            securitytype: 'none',
            username: null,
            password: null,
            clientSslCertificate: {
              name: ''
            },
            trustSslServerCertificate: {
              name: ''
            }
          },
          operatorinfo: {
            id: null,
            name: '',
            requestProfile: {
              name: ''
            },
            responseProfile: {
              name: ''
            },
            attachmentCache: {
              name: ''
            },
            errorBehavior: false,
            exposeRequestEnvelope: false,
            exposeResponseEnvelope: false,
            connectorAction: 'execute',
            object: 'VendorList',
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
            archiving: {
              archiveDocumentData: false
            },
            tracking: {
              trackedFields: []
            },
            caching: {
              documentCache: {
                name: ''
              }
            }
          }
        },
        retry: {
          retryWithErrorTypes: '',
          retryNumber: 0,
          timeOut: 10,
          sleepTimeBF: 2
        }
      };
    }
  }
}
