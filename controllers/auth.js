const formidable = require('formidable');

module.exports = {
	signupGet(req, res) {
		res.render('signup', { title: 'Sign up' });
	},
	signupPost(req, res) {
		const form = new formidable.IncomingForm();

		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.redirect('/signup');
			}
			const username = fields.username;
			const password = fields.password;
			const rePass = fields.repeatPassword;

			if (username === '' || password === '') {
				return res.redirect('/signup');
			}
			if (password !== rePass) {
				return res.redirect('/signup');
			}

			try {
				await req.auth.signup(username, password);
				res.redirect('/');
			} catch (err) {
				console.log(err.message);
				return res.redirect('/signup');
			}

		})
	},
	loginGet(req, res) {
		res.render('login', { title: 'Log in' });
	},
	async loginPost(req, res) {
		const form = new formidable.IncomingForm();

		form.parse(req, async (err, fields) => {
			try {
				if (err) {
					throw new Error('Error reading form')
				}
				const result = await req.auth.login(fields.username, fields.password);
				res.redirect('/');
			} catch (err) {
				console.log(err.message);
				return res.redirect('/login');
			}
		})
	},
	logoutGet(req, res) {

	},
	logoutpost(req, res) {

	},

}