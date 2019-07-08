import Repository from 'contracts/repositories/Repository';
import User from 'contracts/domain/User';

export default interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>
}
