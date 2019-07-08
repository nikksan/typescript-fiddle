import NewUser from 'contracts/services/auth/NewUser';
import User from 'contracts/domain/User';
import AuthCredentials from 'contracts/services/auth/AuthCredentials';
import AuthenticatedUser from 'contracts/services/auth/AuthenticatedUser';

export default interface AuthService {
  register(user: NewUser): Promise<AuthenticatedUser>,
  auth(credentials: AuthCredentials): Promise<User>,
  login(email: string, password: string): Promise<AuthenticatedUser>,
  logout(credentials: AuthCredentials): Promise<boolean>
}
