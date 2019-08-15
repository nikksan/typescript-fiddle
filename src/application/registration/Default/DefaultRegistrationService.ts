import User from '../../../domain/User/User';
import UserRepository from '../../../domain/User/UserRepository';
import RegistrationService from './../RegistrationService';
import Hasher from '../../../infrastructure/hash/Hasher';
import NewUserRequest from './../NewUserRequest';

class BaseRegistrationService implements RegistrationService {
	private userRepository: UserRepository;
	private hasher: Hasher;

	constructor(userRepository: UserRepository, hasher: Hasher) {
		this.userRepository = userRepository;
		this.hasher = hasher;
	}

	async register(userReq: NewUserRequest) {
		await this.validateEmail(userReq.email);

		const user = new User({
			firstName: userReq.firstName,
		  lastName: userReq.lastName,
		  email: userReq.email,
		  password: this.hasher.make(userReq.password)
		});

		return this.userRepository.save(user);
	}

	private async validateEmail(email: string) {
		if (await this.userRepository.findByEmail(email)) {
			throw new Error(`User with email ${email} already exists!`);
		}
	}
}

export default BaseRegistrationService;

