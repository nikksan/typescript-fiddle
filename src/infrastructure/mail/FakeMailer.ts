import Mailer, { Mail } from './Mailer';

class FakeMailer implements Mailer {
	async send(mail: Mail) {
		return true;
	}
}

export default FakeMailer;