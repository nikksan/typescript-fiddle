import AuthService from 'contracts/services/auth/AuthService';
import NewUser from 'contracts/services/auth/NewUser';
import User from 'contracts/domain/User';
import AuthCredentials from 'contracts/services/auth/AuthCredentials';
import AuthenticatedUser from 'contracts/services/auth/AuthenticatedUser';
import Container from 'contracts/ioc/Container';
import UserRepository from 'contracts/repositories/UserRepository';
import Hasher from 'contracts/services/hash/Hasher';

export default class implements AuthService {
  private userRepository: UserRepository;
  private authenticatedUsers: AuthenticatedUser[] = [];
  private hasher: Hasher;

  constructor(container: Container) {
    this.userRepository = <UserRepository>container.resolve('userRepository');
    this.hasher = <Hasher>container.resolve('hasher');
  }

  async register(newUser: NewUser) {
    let user: User = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: this.hasher.make(newUser.password)
    };

    user = await this.userRepository.save(user);
    const authenticatedUser: AuthenticatedUser = {
      user,
      auth: this.createAuthCrendetials()
    };

    this.authenticatedUsers.push(authenticatedUser);
    return authenticatedUser;
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

    if (!this.hasher.check(password, user.password)) {
      throw new Error('Incorrect password!');
    }

    const alreadyAuthenticatedUser = this.findByUserId(user.id);
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

    this.authenticatedUsers = this.authenticatedUsers.filter(au => au.user.id !== alreadyAuthenticatedUser.user.id);

    return true;
  }

  private findByToken(token: string) {
    return this.authenticatedUsers.find(au => au.auth.token === token);
  }

  private findByUserId(id: string | number) {
    return this.authenticatedUsers.find(au => au.user.id === id);
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
