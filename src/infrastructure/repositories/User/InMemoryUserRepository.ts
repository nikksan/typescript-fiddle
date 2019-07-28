import uuid from 'uuid';
import UserRepository from '../../../domain/User/UserRepository';
import User from '../../../domain/User/User';

class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  public async save(user: User) {
    if (user.getId()) {
      if (await this.findById(user.getId())) {
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
    user.setId(uuid());
    this.users.push(user);

    return user;
  }

  private update(user: User) {
    this.users = this.users.map(u => user.equals(u) ? user : u);
    return user;
  }

  private findByField(field: 'id' | 'email', value:any ) {
    return this.users.find(user => user[field] === value)
  }
}

export default InMemoryUserRepository;