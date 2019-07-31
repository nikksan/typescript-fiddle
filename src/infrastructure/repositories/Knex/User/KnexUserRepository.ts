import UserRepository from '../../../../domain/User/UserRepository';
import User from '../../../../domain/User/User';
import KnexRepository from '../KnexRepository';

class KnexUserRepository extends KnexRepository<User> implements UserRepository {
  private table = 'users';

  async findById(id: string) {
    const row = await this.queryBuilder
      .table(this.table)
      .where({ id })
      .first();

    return row ? this.mapRowToUser(row) : null;
  }
  
  async findAll() {
    const rows = await this.queryBuilder
      .select()
      .from(this.table);

    const users = [];
    for (const row of rows) {
      users.push(this.mapRowToUser(row));
    }

    return users;
  }

  async save(user: User) {
    if (!user.getId()) {
      user.setId(this.getNextId());
    }

    const row = this.mapUserToRow(user);
    await this.queryBuilder(this.table).insert(row);

    return this.findById(user.getId());
  };

  async findByEmail(email: string) {
    const row = await this.queryBuilder
      .table(this.table)
      .where({ email })
      .first();

    return row ? this.mapRowToUser(row) : null;
  }

  private mapRowToUser(row: any): User {
    const dto = {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      password: row.password
    };

    return new User(dto);
  }

  private mapUserToRow(user: User) {
    const row = {
      id: user.getId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      password: user.getPassword()
    };

    return row;
  }
}

export default KnexUserRepository;
