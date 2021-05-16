import {IUser} from '../data/user';

export interface ILoginState {
  isLoggedIn: boolean;
  user: IUser;
  username: string;
  password: string;
}
