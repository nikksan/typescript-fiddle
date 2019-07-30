import Mailgun from 'mailgun-js';
import Mailer, { Mail } from '../../application/mail/Mailer';
import ClientError from '../../application/mail/errors/ClientError';
import TransportError from '../../application/mail/errors/TransportError';

class MailgunMailer implements Mailer {
  private client: Mailgun.Mailgun;
  private debug: boolean;

  constructor(apiKey: string, domain: string, debug: boolean = false) {
    this.debug = debug;

    this.log(`Attempting to init mailing client..`);
    try {
      this.client = Mailgun({ apiKey, domain });
    } catch (err) {
      this.log(err);
      throw new ClientError('Failed to init mailing client!');
    }

    this.log('..done!');
  }

  send(mail: Mail): Promise<boolean> {
    const message = {
      from: mail.sender,
      to: mail.receiver,
      subject: mail.subject,
      text: mail.text,
      html: mail.html
    };

    this.log(`Attempting to send message..`);
    return new Promise((resolve, reject) => {
      this.client.messages().send(message, (err) => {
        if (err) {
          this.log(err);
          reject(new TransportError('Something went wrong while attempting to send the email!'));
        }

        resolve(true);
        this.log('..done!');
      });
    });
  }

  private log(thing: any) {
    if (this.debug) {
      console.log('[MailgunMailer: DEBUG]', thing);
    }
  }
}

export default MailgunMailer;
