import IUser from '../../domain/IUser';
import IAuthCredentials from './IAuthCredentials';

export default interface IAuthenticatedUser {
  user: IUser,
  auth: IAuthCredentials
}
