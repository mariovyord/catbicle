const Cat = require('../models/Cat');

async function getAll(query) {
	const options = {};

	if (query.search) {
		options.name = new RegExp(query.search, 'i');
	}

	const cats = await Cat.find(options);

	return cats.map(catViewModel);
}

async function getById(id) {
	const cat = await Cat.findById(id);
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

async function addCat(cat) {
	const result = new Cat(cat);
	await result.save();
}

function catViewModel(cat) {
	return {
		id: cat._id,
		name: cat.name,
		description: cat.description,
		imageUrl: cat.imageUrl || undefined,
		stars: cat.stars,
	};
}

module.exports = () => (req, res, next) => {
	req.storage = {
		getAll,
		getById,
		addCat,
		deleteById,
		editById,
	}
	next();
}