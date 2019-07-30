import Provider from './Provider';
import Container from '../Container';
import MailgunMailer from '../../mail/MailgunMailer';

class MailerProvider implements Provider {
  provide(container: Container) {
    const mailer = new MailgunMailer(
      'apiKey',
      'domain'
    );

    container.register('mailer', mailer);
  }
}

export default MailerProvider;
