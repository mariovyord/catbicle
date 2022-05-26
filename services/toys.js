const Toy = require('../models/Toy');

async function createToy(toy) {
	await Toy.create(toy);
}

module.exports = () => (req, res, next) => {
	req.toy = {
		createToy,
	};
	next();
}