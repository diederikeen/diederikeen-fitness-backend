export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export type IUserPayload = Pick<
  IUser,
  'name' | 'email' | 'password' | 'updatedAt'
>;

export type IUserCreateResponse = Pick<IUser, 'name' | 'email'> & {
  authToken: string;
};
