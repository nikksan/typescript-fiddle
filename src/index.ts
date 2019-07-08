import AuthService from 'contracts/services/auth/AuthService';
import container from 'root';

const authService = <AuthService>container.resolve('authService');

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
})();
