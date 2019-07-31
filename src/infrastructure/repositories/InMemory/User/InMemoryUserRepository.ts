import UserRepository from '../../../../domain/User/UserRepository';
import User from '../../../../domain/User/User';
import InMemoryRepository from '../InMemoryRepository';

class InMemoryUserRepository extends InMemoryRepository<User> implements UserRepository {
  async findByEmail(email: string) {
    return this.entities.find(e => e.getEmail() === email);
  }
}

export default InMemoryUserRepository;
