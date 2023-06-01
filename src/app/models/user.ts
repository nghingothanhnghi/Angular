import { GenericModel } from './generic-model';
// demo login
export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token?: string;
}
export class UserModel extends GenericModel {
  user_name: string;
  password: string;
  access_token: string;
  customerId: string;
  customer_key: string;
  email: string;
  userId: string;
}
