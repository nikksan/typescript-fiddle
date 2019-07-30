import Container from './infrastructure/ioc/BaseContainer';

import HasherProvider from './infrastructure/ioc/providers/HasherProvider';
import AuthServiceProvider from './infrastructure/ioc/providers/AuthServiceProvider';
import MailerProvider from './infrastructure/ioc/providers/MailerProvider';
import RegistrationServiceProvider from './infrastructure/ioc/providers/RegistrationServiceProvider';
import UserRepositoryProvider from './infrastructure/ioc/providers/UserRepositoryProvider';

const container = new Container();

container.bootstrapProvider(HasherProvider);
container.bootstrapProvider(MailerProvider);
container.bootstrapProvider(UserRepositoryProvider);
container.bootstrapProvider(AuthServiceProvider);
container.bootstrapProvider(RegistrationServiceProvider);

export default container;

