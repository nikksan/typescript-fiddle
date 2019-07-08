import bcrypt from 'bcrypt';
import Hasher from 'contracts/services/hash/Hasher';

class BcryptHasher implements Hasher {
  private saltRounds: number;

  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  make(plain: string) {
    return bcrypt.hashSync(plain, this.saltRounds);
  }

  check(plain: string, hash: string) {
    return bcrypt.compareSync(plain, hash);
  }
}

export default BcryptHasher;
