import IUser from '../../../domain/IUser';

export interface INewUserDTO {
	firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default interface IRegistrationService {
	register(user: INewUserDTO): Promise<IUser>;
}