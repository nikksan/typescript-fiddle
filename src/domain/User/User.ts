class User {
	private id: string;
	private firstName: string;
	private lastName: string;
	private email: string;
	private password: string;

	constructor(dto: any) {
		this.id = dto.id;
		this.firstName = dto.firstName;
		this.lastName = dto.lastName;
		this.email = dto.email;
		this.password = dto.password;
	}

	equals(anotherUser: User) {
		return this.id === anotherUser.getId();
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
		this.setPassword(password);
	}
}

export default User;