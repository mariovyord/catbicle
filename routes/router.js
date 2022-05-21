const express = require('express');
const router = express.Router();

// Middlewares
const catsService = require('../services/cats')

// Controllers
const { about } = require('../controllers/about');
const create = require('../controllers/create');
const { details } = require('../controllers/details');
const { home } = require('../controllers/home');
const { notFound } = require('../controllers/notFound');

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

// router.use(express.urlencoded({ extended: true }));
router.use('/static', express.static('static'));
router.use(catsService());

router.get('/', home);
router.get('/about', about);
router.route('/create')
	.get(create.get)
	.post(create.post)
router.get('/details/:id', details);
router.all('*', notFound);

module.exports = router;