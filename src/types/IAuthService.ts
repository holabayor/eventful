import { IUser } from '../models/user';

export interface IAuthService {
  register(data: IUser): Promise<IUser>;
  login(email: string, password: string): void;
}
