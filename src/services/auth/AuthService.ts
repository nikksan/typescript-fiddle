import IAuthService from './IAuthService';
import INewUser from './INewUser';
import IUser from '../../domain/IUser';
import IAuthCredentials from './IAuthCredentials';
import IAuthenticatedUser from './IAuthenticatedUser';
import IContainer from '../../ioc/IContainer';
import IUserRepository from '../../infrastructure/repositories/IUserRepository';
import IHasher from '../../services/hash/IHasher';

export default class implements IAuthService {
  private userRepository: IUserRepository;
  private authenticatedUsers: IAuthenticatedUser[] = [];
  private hasher: IHasher;

  constructor(container: IContainer) {
    this.userRepository = <IUserRepository>container.resolve('userRepository');
    this.hasher = <IHasher>container.resolve('hasher');
  }

  async register(newUser: INewUser) {
    let user: IUser = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: this.hasher.make(newUser.password)
    };

    user = await this.userRepository.save(user);
    const authenticatedUser: IAuthenticatedUser = {
      user,
      auth: this.createAuthCrendetials()
    };

    this.authenticatedUsers.push(authenticatedUser);
    return authenticatedUser;
  }

  async auth(credentials: IAuthCredentials) {
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

    const authenticatedUser: IAuthenticatedUser = {
      user,
      auth: this.createAuthCrendetials()
    };
    this.authenticatedUsers.push(authenticatedUser);

    return authenticatedUser;
  }

  async logout(credentials: IAuthCredentials) {
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

  private createAuthCrendetials(): IAuthCredentials {
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
