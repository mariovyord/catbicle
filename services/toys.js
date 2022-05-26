const Toy = require('../models/Toy');

function mapToViewModel(toy) {
	return {
		id: toy._id,
		name: toy.name,
		description: toy.description,
		imageUrl: toy.imageUrl
	}
}

async function getAll() {
	const toys = await Toy.find({});
	return toys.map(mapToViewModel);
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