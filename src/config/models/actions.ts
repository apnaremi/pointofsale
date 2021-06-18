import {IOrderingSettings} from './data';

export interface ILoginRequestState {
  type: String;
  data: {username: string; password: string};
  onSuccess: Function;
  onFailure: Function;
}

interface IResponse {
  data: any;
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
}

export interface IOrderingSettingsResponse {
  type: String;
  response: IOrderingSettings;
}

export interface IOrderingSettingsRequestState {
  type: String;
  data: {userId: string; companyId: string};
  onSuccess: Function;
  onFailure: Function;
}

export interface IRequestAvatarState {
  type: String;
  data: {userId: string; image: any; isForDelete: boolean};
  onSuccess: Function;
  onFailure: Function;
}
