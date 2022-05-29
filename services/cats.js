const Cat = require('../models/Cat');
const Toy = require('../models/Toy');
const { catViewModel, toyViewModel } = require('./util');

async function getAll(query) {
	const options = {};

	if (query.search) {
		options.name = new RegExp(query.search, 'i');
	}

	const cats = await Cat.find(options);

	return cats.map(catViewModel);
}

async function getById(id) {
	const cat = await Cat.findById(id).populate('toys');
	if (cat) {
		return catViewModel(cat);
	} else {
		return undefined;
	}
}

async function deleteById(id, userId) {
	const existing = await Cat.findById(id);

	if (existing.owner.toString() !== userId) {
		throw new Error('User is not owner');
		return false;
	};

	await Cat.findByIdAndDelete(id);

	return true;
}

async function editById(id, cat, userId) {
	const existing = await Cat.findById(id);
	if (existing.owner.toString() !== userId) {
		throw new Error('User is not owner');
		return false;
	};

	existing.name = cat.name;
	existing.description = cat.description;
	existing.stars = cat.stars;

	await existing.save();

	return true;
}

async function addToy(catId, toyId, userId) {
	const existing = await Cat.findById(catId);

	if (existing.owner.toString() !== userId) {
		throw new Error('User is not owner');
		return false;
	};

	existing.toys.push(toyId);
	await existing.save();
	return true;

}

async function addCat(cat) {
	const result = new Cat(cat);
	await result.save();
}

module.exports = () => (req, res, next) => {
	req.storage = {
		getAll,
		getById,
		addCat,
		deleteById,
		editById,
		addToy,
	}
	next();
}