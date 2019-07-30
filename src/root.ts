import Container from './infrastructure/ioc/BaseContainer';

import HasherProvider from './infrastructure/ioc/providers/HasherProvider';
import AuthServiceProvider from './infrastructure/ioc/providers/AuthServiceProvider';
import MailerProvider from './infrastructure/ioc/providers/MailerProvider';
import RegistrationServiceProvider from './infrastructure/ioc/providers/RegistrationServiceProvider';
import UserRepositoryProvider from './infrastructure/ioc/providers/UserRepositoryProvider';

const container = new Container();

const hasherProvider = new HasherProvider();
hasherProvider.provide(container);

const mailerProvider = new MailerProvider();
mailerProvider.provide(container);

const userRepositoryProvider = new UserRepositoryProvider();
userRepositoryProvider.provide(container);

const authServiceProvider = new AuthServiceProvider();
authServiceProvider.provide(container);

const registrationServiceProvider = new RegistrationServiceProvider();
registrationServiceProvider.provide(container);

export default container;
