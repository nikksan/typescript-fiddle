import Container from './infrastructure/ioc/BaseContainer';
import UserRepository from './infrastructure/repositories/User/InMemoryUserRepository';
import AuthService from './application/auth/BaseAuthService';
import Hasher from './infrastructure/hash/BcryptHasher';
import RegistrationService from './application/registration/BaseRegistrationService';

const container = new Container();

container.singleton('registrationService', RegistrationService, ['userRepository', 'hasher']);
container.singleton('hasher', Hasher);
container.singleton('userRepository', UserRepository);
container.singleton('authService', AuthService, ['userRepository', 'hasher']);

export default container;
