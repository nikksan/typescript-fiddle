import User from './User';
import Repository from '../Repository';

export default interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>
}
