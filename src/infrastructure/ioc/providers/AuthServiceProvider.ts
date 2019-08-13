import path from 'path';
import Provider from './Provider';
import Container from '../Container';
import UserRepository from '../../../domain/User/UserRepository';
// import SQLiteAuthService from '../../../application/auth/SQLite/SQLiteAuthService';
// import FileStoredAuthService from '../../../application/auth/FileStored/FileStoredAuthService';
import NodeCacheAuthService from '../../auth/NodeCache/NodeCacheAuthService';

class AuthServiceProvider implements Provider {
  provide(container: Container) {
    const userRepository = <UserRepository>container.resolve('userRepository');
    // const filePath = path.join(__dirname, '../../../../auth.store');

    const authService = new NodeCacheAuthService(userRepository);
    container.register('authService', authService);
  }
}

export default AuthServiceProvider;
