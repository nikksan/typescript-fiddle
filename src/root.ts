import Container from 'ioc/Container';
import UserRepository from 'repositories/UserRepository';
import AuthService from 'services/auth/AuthService';
import Hasher from 'services/hash/BcryptHasher';

const container = new Container();

const hasher = new Hasher();
container.register('hasher', hasher);

const userRepository = new UserRepository();
container.register('userRepository', userRepository);

const authService = new AuthService(container);
container.register('authService', authService);

export default container;
