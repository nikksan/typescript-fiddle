import NodeCache from 'node-cache';
import uuid from 'uuid';

import AuthService from '../AuthService';
import UserRepository from '../../../domain/User/UserRepository';
import User from '../../../domain/User/User';


class NodeCacheAuthService implements AuthService {
  private userRepository: UserRepository;
  private cache: NodeCache;
  private cacheKey: string;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.cacheKey = 'auth';
    this.cache = new NodeCache();
  }

  async auth(user: User) {
    const authMap = this.hydrateAuthMap();

    let token = authMap.get(user.getId());
    if (token) {
      return token;
    }

    token = uuid();
    authMap.set(user.getId(), token);
    this.persistAuthMap(authMap);

    return token;
  }

  async findByToken(token: string) {
    const authMap = this.hydrateAuthMap();
    const userIds = Array.from(authMap.keys());
    const tokens = Array.from(authMap.values());

    const idx = tokens.findIndex(t => t === token);
    if (idx === -1) {
      return null;
    }

    return this.userRepository.findById(userIds[idx]);
  }

  private hydrateAuthMap(): Map<string, string>{
    let authMap = new Map<string, string>();
    try {
      const cachedAuthMap = <Map<string, string>>this.cache.get(this.cacheKey);
      if (typeof cachedAuthMap === 'object') {
        authMap = cachedAuthMap;
      }
    } catch (err) {

    }

    return authMap;
  }

  private persistAuthMap(authMap: Map<string, string>) {
    this.cache.set(this.cacheKey, authMap);
  }
}

export default NodeCacheAuthService;
