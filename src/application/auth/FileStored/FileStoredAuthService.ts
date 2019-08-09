import fs from 'fs';
import AuthService from './../AuthService';
import User from '../../../domain/User/User';
import UserRepository from '../../../domain/User/UserRepository';
import uuid from 'uuid';

class FileStoredAuthService implements AuthService {
  private userRepository: UserRepository;
  private filePath: string;
  private authMap: Map<string, string>;

  constructor(userRepository: UserRepository, filePath: string) {
    this.userRepository = userRepository;
    this.filePath = filePath;
    this.authMap = new Map();

    this.hydrateAuthMap();
  }

  async auth(user: User) {
    let token = this.authMap.get(user.getId());
    if (token) {
      return token;
    }

    token = this.generateRandomToken();
    this.authMap.set(user.getId(), token);
    this.persistAuthMap();

    return token;
  }

  async findByToken(token: string): Promise<User | null> {
    for (const userId of this.authMap.keys()) {
      if (this.authMap.get(userId) === token) {
        return this.userRepository.findById(userId);
      }
    }

    return null;
  }

  private generateRandomToken() {
    return uuid();
  }

  private persistAuthMap() {
    const stringifyedMap = JSON.stringify(Array.from(this.authMap.entries()));
    fs.writeFileSync(this.filePath, stringifyedMap);
  }

  private hydrateAuthMap() {
    try {
      const contents = fs.readFileSync(this.filePath);
      const seed = JSON.parse(contents.toString());
      this.authMap = new Map(seed);
    } catch (err) {

    }
  }
}

export default FileStoredAuthService;
