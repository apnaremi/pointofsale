import {IOrderingSettings} from './data';

export interface ILoginResponse {
  success: boolean;
  token: any;
  data: any;
  message: string;
  tfaRequired: boolean;
  tfaToken: string;
  tfaUserId: string;
}

export interface IApiOrderingSettingsResponse {
  success: boolean;
  message: string;
  data: IOrderingSettings;
}
