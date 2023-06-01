import { ComponentModel } from './component';
import { CreationComponentInfo } from './creation-component-info';

export class HttpClientConnection extends ComponentModel {
  constructor(info: CreationComponentInfo = { type: 'Connection', localType: 'httpclient' }) {
    super(info);

    this.content = {
      url: '',
      authenticationCode: '',
      username: null,
      password: null,
      authorization_params: [],
      response_type: 'code',
      grant_type: 'authorization_code',
      client_id: '',
      client_secret: '',
      redirect_uri: '',
      authorizationTokenUrl: '',
      tokenUrl: '',
      token_params: [],
      scope: '',
      state: '',
      code: '',
      access_token: '',
      refresh_token: '',
      token_type: '',
      expires_in: 0,
      is_refresh_token: true,
      response_date_utc: new Date()
    };
  }
}
