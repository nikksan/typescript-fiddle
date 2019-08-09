import Provider from './Provider';
import Container from '../Container';
import InMemoryUserRepository from '../../repositories/InMemory/User/InMemoryUserRepository';
// import config from '../../../config';

class UserRepositoryProvider implements Provider {
  provide(container: Container) {
    const userRepository = new InMemoryUserRepository();
    container.register('userRepository', userRepository);
  }
}

export default UserRepositoryProvider;
