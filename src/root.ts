import Container from './infrastructure/ioc/Container';
import UserRepository from './infrastructure/repositories/UserRepository';
import AuthService from './services/auth/AuthService';
import Hasher from './services/hash/BcryptHasher';

const container = new Container();

container.singleton('hasher', Hasher);
container.singleton('userRepository', UserRepository);
container.singleton('authService', AuthService, ['userRepository', 'hasher']);

export default container;
