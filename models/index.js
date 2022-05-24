const mongoose = require('mongoose');

const Cat = require('./Cat');

const connectionString = 'mongodb://localhost:27017/catbicle';

async function init() {
	try {
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('Database connected');
		mongoose.connection.on('error', (err) => {
			console.error('Database error');
			console.error(err);
		})
	} catch (err) {
		console.error('Error connecting to database')
		process.exit(1);
	}
}

module.exports = init;