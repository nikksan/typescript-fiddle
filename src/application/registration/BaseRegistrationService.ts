import User from '../../domain/User/User';
import UserRepository from '../../domain/User/UserRepository';
import RegistrationService, { NewUserDTO } from './RegistrationService';
import Hasher from '../hash/Hasher';
import Mailer from '../../infrastructure/mail/Mailer';

class BaseRegistrationService implements RegistrationService {
	private userRepository: UserRepository;
	private hasher: Hasher;

	constructor(deps: any) {
		this.userRepository = deps.userRepository;
		this.hasher = deps.hasher;
	}

	async register(userDTO: NewUserDTO) {
		await this.validateEmail(userDTO.email);
	
		const user = new User({
			firstName: userDTO.firstName,
		  lastName: userDTO.lastName,
		  email: userDTO.email,
		  password: this.hasher.make(userDTO.password)
		})

		return this.userRepository.save(user);
	}

	private async validateEmail(email: string) {
		if (await this.userRepository.findByEmail(email)) {
			throw new Error(`User with email ${email} already exists!`);
		}
	}
}

export default BaseRegistrationService;