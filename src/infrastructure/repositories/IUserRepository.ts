import IRepository from './IRepository';
import IUser from '../../domain/IUser';

export default interface IUserRepository extends IRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>
}
