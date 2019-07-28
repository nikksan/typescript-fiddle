import AuthService, { AuthCredentials, AuthenticatedUser} from './AuthService';
import User from '../../domain/User/User';
import UserRepository from '../../domain/User/UserRepository';
import Hasher from '../hash/Hasher';

class BaseAuthService implements AuthService {
  private userRepository: UserRepository;
  private authenticatedUsers: AuthenticatedUser[] = [];
  private hasher: Hasher;

  constructor(userRepository: UserRepository, hasher: Hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }

  async auth(credentials: AuthCredentials) {
    const authenticated = this.findByToken(credentials.token);
    if (!authenticated) {
      throw new Error(`Failed to authenticate user by using token: ${credentials.token}`);
    }

    return authenticated.user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Incorrect email!');
    }

    if (!this.hasher.check(password, user.getPassword())) {
      throw new Error('Incorrect password!');
    }

    const alreadyAuthenticatedUser = this.findByUserId(user.getId());
    if (alreadyAuthenticatedUser) {
      return alreadyAuthenticatedUser;
    }

    const authenticatedUser: AuthenticatedUser = {
      user,
      auth: this.createAuthCrendetials()
    };
    this.authenticatedUsers.push(authenticatedUser);

    return authenticatedUser;
  }

  async logout(credentials: AuthCredentials) {
    const alreadyAuthenticatedUser = this.findByToken(credentials.token);
    if (!alreadyAuthenticatedUser) {
      throw new Error('Logout failed!');
    }

    this.authenticatedUsers = this.authenticatedUsers.filter(au => !au.user.equals(alreadyAuthenticatedUser.user));

    return true;
  }

  private findByToken(token: string) {
    return this.authenticatedUsers.find(au => au.auth.token === token);
  }

  private findByUserId(id: string | number) {
    return this.authenticatedUsers.find(au => au.user.getId() === id);
  }

  private createAuthCrendetials(): AuthCredentials {
    return {
      token: this.generateRandomString()
    }
  }

  private generateRandomString(length: number = 64): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default BaseAuthService;
