import IRegistrationService from './infrastructure/services/registration/IRegistrationService';
import container from './root';

const registrationService = <IRegistrationService>container.resolve('registrationService');

(async () => {
  await registrationService.register({
    firstName: 'Nikola',
    lastName: 'Mihaylov',
    email: 'nikksanus@gmail.com',
    password: 'asd123',
    confirmPassword: 'asd123'
  });
  
  console.log(registrationService);
})();
