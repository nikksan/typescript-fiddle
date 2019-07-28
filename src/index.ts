import RegistrationService from './application/registration/RegistrationService';
import AuthService from './application/auth/AuthService';
import UserRepository from './domain/User/UserRepository';
import container from './root';

const registrationService = <RegistrationService>container.resolve('registrationService');
const userRepository = <UserRepository>container.resolve('userRepository');
const authService = <AuthService>container.resolve('authService');

(async () => {
  await registrationService.register({
    firstName: 'asd',
    lastName: 'asd',
    email: 'asd@gmail.com',
    password: 'asd123',
    confirmPassword: 'asd123'
  });

  const user = await userRepository.findByEmail('asd@gmail.com');

  const token = await authService.auth(user);
  console.log(token);
  console.log(await authService.findByToken(token));
})();
