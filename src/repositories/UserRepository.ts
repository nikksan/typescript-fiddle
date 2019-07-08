import uuid from 'uuid';
import UserRepository from 'contracts/repositories/UserRepository';
import User from 'contracts/domain/User';

export default class implements UserRepository {
  private users: User[] = [];

  public async save(user: User) {
    if (user.id) {
      if (await this.findById(user.id)) {
        return this.update(user);
      }

      throw new Error('Attempted to save user with id which we could not identify!');
    }

    return this.create(user);
  }

  public async findById(id: number | string) {
    return this.findByField('id', id);
  }

  public async findAll() {
    return this.users;
  }

  public async findByEmail(email: string) {
    return this.findByField('email', email);
  }

  private create(user: User) {
    user.id = uuid();
    this.users.push(user);

    return user;
  }

  private update(user: User) {
    this.users = this.users.map(u => u.id === user.id ? user : u);
    return user;
  }

  private findByField(field: 'id' | 'email', value:any ) {
    return this.users.find(user => user[field] === value)
  }
}
