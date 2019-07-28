import RegistrationService from './application/registration/RegistrationService';
import UserRepository from './domain/User/UserRepository';
import container from './root';

const registrationService = <RegistrationService>container.resolve('registrationService');
const userRepository = <UserRepository>container.resolve('userRepository');

(async () => {
  await registrationService.register({
    firstName: 'Nikola',
    lastName: 'Mihaylov',
    email: 'nikksanus@gmail.com',
    password: 'asd123',
    confirmPassword: 'asd123'
  });

  console.log(userRepository);
})();
