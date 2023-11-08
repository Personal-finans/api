import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const MailerConfig = {
	transport: {
		service: 'gmail',
		host: process.env.SMTP_HOST,
		port: 587,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	},
	defaults: {
		from: `"Finans." < ${process.env.SMTP_USER} >`,
	},
	template: {
		dir: __dirname + '/templates',
		adapter: new PugAdapter(),
		options: {
			strict: true,
		},
	},
};
