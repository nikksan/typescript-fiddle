import Provider from './Provider';
import Container from '../Container';
import UserRepository from '../../../domain/User/UserRepository';
import Hasher from '../../hash/Hasher';
import DefaultRegistrationService from '../../../application/registration/Default/DefaultRegistrationService';

class RegistrationServiceProvider implements Provider {
  provide(container: Container) {
    const userRepository = <UserRepository>container.resolve('userRepository');
    const hasher = <Hasher>container.resolve('hasher');

    const registrationService = new DefaultRegistrationService(userRepository, hasher);
    container.register('registrationService', registrationService);
  }
}

export default RegistrationServiceProvider;
