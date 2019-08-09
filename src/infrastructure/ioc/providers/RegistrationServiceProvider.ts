import Provider from './Provider';
import Container from '../Container';
import UserRepository from '../../../domain/User/UserRepository';
import Hasher from '../../hash/Hasher';
import BaseRegistrationService from '../../../application/registration/BaseRegistrationService';

class RegistrationServiceProvider implements Provider {
  provide(container: Container) {
    const userRepository = <UserRepository>container.resolve('userRepository');
    const hasher = <Hasher>container.resolve('hasher');

    const registrationService = new BaseRegistrationService(userRepository, hasher);
    container.register('registrationService', registrationService);
  }
}

export default RegistrationServiceProvider;
