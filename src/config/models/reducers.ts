import {ICategory, IOrderingSettings, IUser} from './data';

export interface ILoginState {
  isLoggedIn: boolean;
  user: IUser;
  username: string;
  password: string;
}

export interface IOrderingSettingsState {
  OrderingSettings: IOrderingSettings;
}

export interface ICategoryState {
  Categories: Array<ICategory>;
}
