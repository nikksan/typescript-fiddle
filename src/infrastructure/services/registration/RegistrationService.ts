import IUser from '../../../domain/IUser';
import IUserRepository from '../../repositories/IUserRepository';
import IRegistrationService, { INewUserDTO } from './IRegistrationService';
import IHasher from '../../../services/hash/IHasher';

class RegistrationService implements IRegistrationService {
	private userRepository: IUserRepository;
	private hasher: IHasher;

	constructor(deps: any) {
		this.userRepository = deps.userRepository;
		this.hasher = deps.hasher;
	}

	async register(userDTO: INewUserDTO) {
		await this.validateEmail(userDTO.email);
	
		const user: IUser = {
			firstName: userDTO.firstName,
		  lastName: userDTO.lastName,
		  email: userDTO.email,
		  password: this.hasher.make(userDTO.password)
		}

		return this.userRepository.save(user);
	}

	private async validateEmail(email: string) {
		if (await this.userRepository.findByEmail(email)) {
			throw new Error(`User with email ${email} already exists!`);
		}
	}
}

export default RegistrationService;