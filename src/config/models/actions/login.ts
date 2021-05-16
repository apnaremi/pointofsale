import {IUser} from '../data/user';

export interface ILoginRequestState {
  type: String;
  data: {username: string; password: string};
  onSuccess: Function;
  onFailure: Function;
}

interface IResponse {
  user: IUser;
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
}
