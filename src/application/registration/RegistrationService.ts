import User from '../../domain/User/User';

export interface NewUserDTO {
	firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default interface RegistrationService {
	register(user: NewUserDTO): Promise<User>;
}