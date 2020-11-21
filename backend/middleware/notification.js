function Notification() {
	this.sendEmail = (email, subject, body) => {
		console.log(`Sending email to ${email}`);
	};
}

module.exports = new Notification();