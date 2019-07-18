import IAuthService from './services/auth/IAuthService';
import container from './root';

const authService = <IAuthService>container.resolve('authService');

(async () => {
  await authService.register({
    firstName: 'Nikola',
    lastName: 'Mihaylov',
    email: 'nikksanus@gmail.com',
    password: 'asd123',
    confirmPassword: 'asd123'
  });

  await authService.register({
    firstName: 'Nikola1',
    lastName: 'Mihaylov2',
    email: 'nikksanus@gmail.com',
    password: 'asd123',
    confirmPassword: 'asd123'
  });

  console.log(authService);
})();
