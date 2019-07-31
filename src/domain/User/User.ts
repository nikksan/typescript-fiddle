import Entity from '../Entity';

class User extends Entity {
	private firstName: string;
	private lastName: string;
	private email: string;
	private password: string;

	constructor(dto: any) {
		super(dto);

		this.firstName = dto.firstName;
		this.lastName = dto.lastName;
		this.email = dto.email;
		this.setPassword(dto.password);
	}

	getFirstName() {
		return this.firstName;
	}

	getLastName() {
		return this.lastName;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}

	setPassword(password: string) {
		this.password = password;
	}
}

export default User;