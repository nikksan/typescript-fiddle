import Provider from './Provider';
import Container from '../Container';
import UserRepository from '../../../domain/User/UserRepository';
import SQLiteAuthService from '../../../application/auth/SQLiteAuthService';

class AuthServiceProvider implements Provider {
  provide(container: Container) {
    const userRepository = <UserRepository>container.resolve('userRepository');

    const authService = new SQLiteAuthService(userRepository);
    container.register('authService', authService);
  }
}

export default AuthServiceProvider;
