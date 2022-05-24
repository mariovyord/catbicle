const express = require('express');
const hbs = require('express-handlebars');
const router = require('./routes/router');
const initDb = require('./models');

// start app
start();

async function start() {
	// Init database connecton
	await initDb();
	// Init app 
	const app = express();

	// Config app
	app.engine('hbs', hbs.create({
		extname: '.hbs'
	}).engine);
	app.set('view engine', 'hbs');

	// Connect router
	app.use(router);

	// Start server
	app.listen(3000, () => {
		console.log('Server listening on port 3000...')
		console.log('URL: http://localhost:3000')
	})
}