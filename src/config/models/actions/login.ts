export interface ILoginRequestState {
  type: String;
  data: {username: string; password: string};
  onSuccess: Function;
  onFailure: Function;
}

interface IResponse {
  id: number;
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
}
