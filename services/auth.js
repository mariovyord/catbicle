const User = require('../models/User');

async function signup(session, username, password) {
	const user = new User({
		username,
		hashedPassword: password,
	});
	await user.save();
	session.user = {
		_id: user._id,
		username: user.username,
	};
}

async function login(session, username, password) {
	const user = await User.findOne({ username });
	if (user && await user.comparePassword(password)) {
		session.user = {
			_id: user._id,
			username: user.username,
		};
		return true;
	} else {
		throw new Error('Incorect username or password');
	}
}

async function logout(session) {
	delete session.user;
}

module.exports = () => (req, res, next) => {
	if (req.session.user) {
		req.app.locals.user = req.session.user;
		req.app.locals.hasUser = true;
	} else {
		req.app.locals.hasUser = false;
	}
	req.auth = {
		signup: (...params) => signup(req.session, ...params),
		login: (...params) => login(req.session, ...params),
		logout: () => logout(req.session),
	};
	next();
}