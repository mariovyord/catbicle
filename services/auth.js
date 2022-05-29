const User = require('../models/User');

async function signup(username, password) {
	const user = new User({
		username,
		hashedPassword: password,
	});
	await user.save();
}

module.exports = () => (req, res, next) => {
	req.auth = {
		signup,
	};
	next();
}