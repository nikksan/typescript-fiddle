export interface Mail {
  sender: string;
	receiver: string;
  subject : string;
	text: string;
	html?: string;
}

export default interface Mailer {
	send(mail: Mail): Promise<boolean>
}
