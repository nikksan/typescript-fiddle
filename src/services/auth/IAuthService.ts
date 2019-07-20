import IUser from '../../domain/IUser';

export interface IAuthCredentials {
  token: string;
}

export interface IAuthenticatedUser {
  user: IUser,
  auth: IAuthCredentials
}

export default interface AuthService {
  auth(credentials: IAuthCredentials): Promise<IUser>,
  login(email: string, password: string): Promise<IAuthenticatedUser>,
  logout(credentials: IAuthCredentials): Promise<boolean>
}
