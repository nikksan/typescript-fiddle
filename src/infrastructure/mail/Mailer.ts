export interface Mail {
	subject : string;
	body: string;
	receiver: string;
}

export default interface Mailer {
	send(mail: Mail): Promise<boolean>
}