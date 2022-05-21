const express = require('express');
const hbs = require('express-handlebars');
const router = require('./routes/router');

const app = express();

app.engine('hbs', hbs.create({
	extname: '.hbs'
}).engine);

app.set('view engine', 'hbs');
app.use(router);

app.listen(3000, () => {
	console.log('Server listening on port 3000...')
	console.log('URL: http://localhost:3000')
})