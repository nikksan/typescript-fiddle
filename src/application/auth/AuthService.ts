import User from '../../domain/User/User';

export default interface AuthService {
  auth(user: User): Promise<string>,
  findByToken(token: string): Promise<User | null>,
}
