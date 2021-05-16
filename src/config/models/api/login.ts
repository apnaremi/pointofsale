export interface ILoginResponse {
  success: boolean;
  token: any;
  user: any;
  message: string;
  tfaRequired: boolean;
  tfaToken: string;
  tfaUserId: string;
}
