import User from 'contracts/domain/User';
import AuthCredentials from 'contracts/services/auth/AuthCredentials';

export default interface AuthenticatedUser {
  user: User,
  auth: AuthCredentials
}
