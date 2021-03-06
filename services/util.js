const bcrypt = require('bcrypt');

function toyViewModel(toy) {
	return {
		id: toy._id,
		name: toy.name,
		description: toy.description,
		imageUrl: toy.imageUrl,
		owner: toy.owner,
	}
}

function catViewModel(cat) {
	const model = {
		id: cat._id,
		name: cat.name,
		description: cat.description,
		imageUrl: cat.imageUrl || undefined,
		stars: cat.stars,
		toys: cat.toys,
		owner: cat.owner,
	};

	if (model.toys.length > 0 && cat.name !== undefined) {
		model.toys = model.toys.map(toyViewModel);
	}

	return model;
}

async function hashPassword(password) {
	return bcrypt.hash(password, 8);
}

async function comparePassword(password, hashedPassword) {
	return bcrypt.compare(password, hashedPassword);
}

function isLoggedIn() {
	return function (req, res, next) {
		if (req.session.user) {
			next();
		} else {
			res.redirect('/login');
		}
	}
}

module.exports = {
	toyViewModel,
	catViewModel,
	hashPassword,
	comparePassword,
	isLoggedIn,
}