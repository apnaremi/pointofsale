
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
