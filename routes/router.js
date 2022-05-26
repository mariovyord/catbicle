const express = require('express');
const router = express.Router();

// Middlewares
const catsService = require('../services/cats')
const toysService = require('../services/toys')

// Controllers
const { about } = require('../controllers/about');
const create = require('../controllers/create');
const { details } = require('../controllers/details');
const { home } = require('../controllers/home');
const { notFound } = require('../controllers/notFound');
const del = require('../controllers/del');
const edit = require('../controllers/edit');
const toy = require('../controllers/toy');
const addToy = require('../controllers/addToy');

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

// router.use(express.urlencoded({ extended: true }));
router.use('/static', express.static('static'));

// Middlewares
router.use(catsService());
router.use(toysService());

router.get('/', home);

router.route('/create')
	.get(create.get)
	.post(create.post)

router.route('/edit/:id')
	.get(edit.get)
	.post(edit.post);

router.route('/delete/:id')
	.get(del.get)
	.post(del.post);

router.get('/details/:id', details);

router.route('/toy')
	.get(toy.get)
	.post(toy.post);

router.route('/add-toy/:id')
	.get(addToy.get)
	.post(addToy.post);

router.get('/about', about);

router.all('*', notFound);

module.exports = router;