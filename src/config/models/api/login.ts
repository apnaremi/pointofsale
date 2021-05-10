export interface ILoginResponse {
  success: boolean;
  token: string;
  user: any;
  message: string;
  tfaRequired: boolean;
  tfaToken: string;
  tfaUserId: string;
}
