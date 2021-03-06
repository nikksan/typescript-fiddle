import RegistrationService from './application/registration/RegistrationService';
import AuthService from './infrastructure/auth/AuthService';
import UserRepository from './domain/User/UserRepository';
import Mailer from './infrastructure/mail/Mailer';
import container from './root';

const registrationService = <RegistrationService>container.resolve('registrationService');
const userRepository = <UserRepository>container.resolve('userRepository');
const authService = <AuthService>container.resolve('authService');
const mailer = <Mailer>container.resolve('mailer');

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
