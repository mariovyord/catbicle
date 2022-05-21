const fs = require('fs/promises');
const uniqid = require('uniqid');

const filePath = './services/data.json';

async function read() {
	try {
		const file = await fs.readFile(filePath);
		// @ts-ignore
		return JSON.parse(file);
	} catch (err) {
		console.error('Database read error.')
		console.error(err);
		process.exit(1);
	}
}

async function write(data) {
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2));
	} catch (err) {
		console.error('Database read error.')
		console.error(err);
		process.exit(1);
	}
}

async function getAll(query) {
	const data = await read();
	let cats = Object
		.entries(data)
		.map(([id, v]) => Object.assign({}, { id }, v))

	if (query.search) {
		cats = cats.filter(cat => cat.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase().trim()));
	}

	return cats;
}

async function getById(id) {
	const data = await read();
	const cat = data[id];
	if (cat) {
		return Object.assign({}, { id }, cat);
	} else {
		return undefined;
	}
}

async function deleteById(id) {
	const data = await read();
	if (data.hasOwnProperty(id)) {
		delete data[id];
		await write(data);
	} else {
		throw new Error('No such reference in database');
	}
}

async function editById(id, cat) {
	const data = await read();
	if (data.hasOwnProperty(id)) {
		data[id].name = cat.name;
		data[id].description = cat.description;
		data[id].stars = cat.stars;
		await write(data);
	} else {
		throw new Error('No such reference in database');
	}
}

async function addCat(cat) {
	const cats = await read();
	const id = uniqid();
	cats[id] = cat;
	await write(cats);
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