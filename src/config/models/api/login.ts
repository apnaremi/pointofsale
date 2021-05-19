export interface ILoginResponse {
  success: boolean;
  token: any;
  data: any;
  message: string;
  tfaRequired: boolean;
  tfaToken: string;
  tfaUserId: string;
}
