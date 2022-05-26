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

async function deleteById(id) {
	await Cat.findByIdAndDelete(id);
}

async function editById(id, cat) {
	const result = {
		name: cat.name,
		description: cat.description,
		stars: cat.stars,
	}
	await Cat.findByIdAndUpdate(id, result);
}

async function addToy(catId, toyId) {
	const existing = await Cat.findById(catId);
	existing.toys.push(toyId);
	await existing.save();
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