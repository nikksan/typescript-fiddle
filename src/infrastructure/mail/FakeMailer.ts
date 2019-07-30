import Mailer, { Mail } from '../../application/mail/Mailer';

class FakeMailer implements Mailer {
	async send(mail: Mail) {
    return true;
	}
}

export default FakeMailer;
