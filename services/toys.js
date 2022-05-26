const Toy = require('../models/Toy');
const { toyViewModel } = require('./util');


async function getAll() {
	const toys = await Toy.find({});
	return toys.map(toyViewModel);
}

async function createToy(toy) {
	await Toy.create(toy);
}

module.exports = () => (req, res, next) => {
	req.toy = {
		createToy,
		getAll
	};
	next();
}