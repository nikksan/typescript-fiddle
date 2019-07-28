class User {
	private id: string;
	private firstName: string;
	private lastName: string;
	private email: string;
	private password: string;

	constructor(dto: any) {
		if (dto.id !== undefined) {
			this.setId(dto.id);
		}
		
		this.firstName = dto.firstName;
		this.lastName = dto.lastName;
		this.email = dto.email;
		this.setPassword(dto.password);
	}

	getId() {
		return this.id;
	}

	setId(id: string) {
		this.id = id;
	}

	getPassword() {
		return this.password;
	}

	setPassword(password: string) {
		this.password = password;
	}

	equals(anotherUser: User) {
		return this.id === anotherUser.getId();
	}

	isPersisted() {
		return !!this.id;
	}
}

export default User;