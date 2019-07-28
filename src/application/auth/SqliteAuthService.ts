import { Database } from 'sqlite3';
import { promisifyAll } from 'bluebird';
import uuid from 'uuid';

import AuthService from './AuthService';
import User from '../../domain/User/User';
import UserRepository from '../../domain/User/UserRepository';
import Hasher from '../hash/Hasher';

class SqliteAuthService implements AuthService {
  private db : any;
  private userRepository: UserRepository;
  private table: string;
  private storageProvider: string;
  private hasRanCreateTableQuery: boolean;
  private userColumn: string;
  private tokenColumn: string;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    
    this.table = 'auth';
    this.userColumn = 'userId';
    this.tokenColumn = 'token';
    this.storageProvider = ':memory:';
    this.db = promisifyAll(
      new Database(this.storageProvider)
    );
    this.hasRanCreateTableQuery = false;
  }

  async auth(user: User) {
    if (!user.isPersisted()) {
      throw new Error('User must be persisted in order to be authenticated!');
    }

    await this.createTableIfNotExists();
    const row = await this.db.getAsync(`SELECT * FROM ${this.table} WHERE ${this.userColumn} = ?`, user.getId());
    if (row) {
      return row.token;
    }

    let token = this.generateRandomToken();
    await this.db.run(`INSERT INTO ${this.table} (${this.userColumn}, ${this.tokenColumn}) VALUES (?, ?)`, user.getId(), token)  
      
    return token;
  }

  public async findByToken(token: string) {
    await this.createTableIfNotExists();

    const row = await this.db.getAsync(`SELECT * FROM ${this.table} WHERE ${this.tokenColumn} = ?`, token);
    if (!row) {
      return null;
    }

    return this.userRepository.findById(row.userId);
  }

  private async createTableIfNotExists() {
    if (!this.hasRanCreateTableQuery) {
      await this.db.runAsync(`CREATE TABLE ${this.table}(${this.userColumn} TEXT, ${this.tokenColumn} TEXT);`)
      this.hasRanCreateTableQuery = true;
    }
  }

  generateRandomToken() {
    return `${uuid()}-${uuid()}`;
  }
}

export default SqliteAuthService;
