const bcrypt = require('bcrypt');

function toyViewModel(toy) {
	return {
		id: toy._id,
		name: toy.name,
		description: toy.description,
		imageUrl: toy.imageUrl,
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

module.exports = {
	toyViewModel,
	catViewModel,
	hashPassword,
	comparePassword,
}