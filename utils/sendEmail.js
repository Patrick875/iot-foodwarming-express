const nodemailer = require("nodemailer");

const config = {
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.RESET_PASSWORD_EMAIL,
		pass: process.env.RESET_PASSWORD_PASSWORD,
	},
};

const resetTemplate = () => {
	return `<!DOCTYPE html>
<html lang="en">
    <style>
    h1{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.2em;
        margin-top:1.2em;
    }
    .ignore{
        font-weight:bold;
        text-decoration:underline
    }
    </style>
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
        <h1 >RWRDJ Admin Panel</h1>
		<p>Hi a request to reset your password has was a success </p>
        <p class='ignore'>Ignore this email you didn't request a password reset</p>
		<p>
		Best regards,
		RWDRJ Team
		</p>
	</body>
</html>`;
};
const forgotPasswordTemplate = (names, token) => {
	const frontendURL = process.env.frontendURL;
	console.log("frontendURL", frontendURL);
	return `<!DOCTYPE html>
<html lang="en">
    <style>
    h1{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.2em;
        margin-top:1.2em;
    }
    .ignore{
        font-weight:bold;
        text-decoration:underline
    }
    </style>
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
        <h1>RWRDJ Admin Panel</h1>
		<p>Dear ${names}</p>
		<p>It seems you've forgotten your password. No worries, we've got you covered! </p>
        <p class='ignore'>To reset your password and regain access to your account, please click on the link below:</p>
		<a href='${frontendURL}/resetpassword/${token}'>Reset Password</a>
        <p class='ignore'>
		If you didn't request this password reset, you can ignore this email. Your account security is important to us, and no action will be taken unless you click the link above and follow the instructions.
		Please note that this link is valid for one-time use only and will expire in [expiry time/duration].
		</p>
		<p>
		Best regards,
		RWDRJ Team
		</p>
	</body>
</html>`;
};

const registerTemplate = (names) => {
	return `<!DOCTYPE html>
<html lang="en">
    <style>
    h1{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.2em;
        margin-top:1.2em;
    }
   
   
    </style>
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
        <h1 >RWRDJ Admin Panel</h1>
		<p>Hi ${names} thank you for registering.</p>
		<p>
		Best regards,
		RWDRJ Team
		</p>
	</body>
</html>`;
};

const send = (mailData, subject, text) => {
	const data = {
		from: process.env.RESET_PASSWORD_EMAIL,
		to: mailData.userEmail,
		subject: subject,
		text: text,
		html:
			subject === "Reset Password"
				? resetTemplate()
				: subject === "register"
				? registerTemplate(mailData.userNames)
				: forgotPasswordTemplate(mailData.userNames, mailData.token),
	};

	const transporter = nodemailer.createTransport(config);

	transporter.sendMail(data, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Email sent:", info.response);
		}
	});
};

module.exports = { send };
