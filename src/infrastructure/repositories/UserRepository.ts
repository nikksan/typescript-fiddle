import uuid from 'uuid';
import IUserRepository from './IUserRepository';
import IUser from '../../domain/IUser';

export default class implements IUserRepository {
  private users: IUser[] = [];

  public async save(user: IUser) {
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

  private create(user: IUser) {
    user.id = uuid();
    this.users.push(user);

    return user;
  }

  private update(user: IUser) {
    this.users = this.users.map(u => u.id === user.id ? user : u);
    return user;
  }

  private findByField(field: 'id' | 'email', value:any ) {
    return this.users.find(user => user[field] === value)
  }
}
