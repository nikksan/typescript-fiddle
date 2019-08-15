import NewUserRequest from './NewUserRequest';
import User from '../../domain/User/User';

interface RegistrationService {
  register(userReq: NewUserRequest): Promise<User>;
}

export default RegistrationService;
