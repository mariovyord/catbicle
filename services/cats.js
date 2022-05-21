const fs = require('fs/promises');

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
		await fs.writeFile(filePath, JSON.stringify(data));
	} catch (err) {
		console.error('Database read error.')
		console.error(err);
		process.exit(1);
	}
}

async function getAll() {
	const data = await read();
	return Object
		.entries(data)
		.map(([id, v]) => Object.assign({}, { id }, v))
}

module.exports = () => (req, res, next) => {
	req.storage = {
		getAll,
	}
	next();
}