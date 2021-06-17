export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  mobile: string;
  companies: Array<any>;
}

export interface IOrderingSettings {
  orderSettings: any;
  seatingArrangement: Array<any>;
  paymentMethods: Array<string>;
}

export interface ICategory {
  name: string;
  companyId: string;
  id: string;
  createdDateUtc: number;
}
