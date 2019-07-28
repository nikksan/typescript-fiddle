import User from '../../domain/User/User';

export interface AuthCredentials {
  token: string;
}

export interface AuthenticatedUser {
  user: User,
  auth: AuthCredentials
}

export default interface AuthService {
  auth(credentials: AuthCredentials): Promise<User>,
  login(email: string, password: string): Promise<AuthenticatedUser>,
  logout(credentials: AuthCredentials): Promise<boolean>
}
