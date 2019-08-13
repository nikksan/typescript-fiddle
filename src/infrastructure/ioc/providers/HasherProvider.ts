import Provider from './Provider';
import Container from '../Container';
import BcryptHasher from '../../hash/Bcrypt/BcryptHasher';

class HasherProvider implements Provider {
  provide(container: Container) {
    const hasher = new BcryptHasher();
    container.register('hasher', hasher);
  }
}

export default HasherProvider;
