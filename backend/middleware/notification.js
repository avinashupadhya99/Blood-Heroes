function Notification() {
	this.sendEmail = (email) => {
		console.log(`Sending email to ${email}`);
	};
}

module.exports = new Notification();