import User from '../../domain/User/User';
import NewUserRequest from './NewUserRequest';

export default interface RegistrationService {
	register(user: NewUserRequest): Promise<User>;
}