import INewUser from './INewUser';
import IUser from '../../domain/IUser';
import IAuthCredentials from './IAuthCredentials';
import IAuthenticatedUser from './IAuthenticatedUser';

export default interface AuthService {
  register(user: INewUser): Promise<IAuthenticatedUser>,
  auth(credentials: IAuthCredentials): Promise<IUser>,
  login(email: string, password: string): Promise<IAuthenticatedUser>,
  logout(credentials: IAuthCredentials): Promise<boolean>
}
