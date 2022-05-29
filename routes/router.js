const express = require('express');
const router = express.Router();
const session = require('express-session');

// Middlewares
const authService = require('../services/auth');
const catsService = require('../services/cats');
const toysService = require('../services/toys');
const { isLoggedIn } = require('../services/util');

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
const auth = require('../controllers/auth');

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

// router.use(express.urlencoded({ extended: true }));
router.use('/static', express.static('static'));

// Middlewares
router.use(session({
	secret: 'my secret sentence',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: 'auto' },
}));
router.use(authService());
router.use(catsService());
router.use(toysService());

router.get('/', home);

router.route('/create')
	.get(isLoggedIn(), create.get)
	.post(isLoggedIn(), create.post)

router.route('/edit/:id')
	.get(isLoggedIn(), edit.get)
	.post(isLoggedIn(), edit.post);

router.route('/delete/:id')
	.get(isLoggedIn(), del.get)
	.post(isLoggedIn(), del.post);

router.get('/details/:id', details);

router.route('/toy')
	.get(toy.get)
	.post(toy.post);

router.route('/add-toy/:id')
	.get(isLoggedIn(), addToy.get)
	.post(isLoggedIn(), addToy.post);

router.route('/login')
	.get(auth.loginGet)
	.post(auth.loginPost);

router.route('/signup')
	.get(auth.signupGet)
	.post(auth.signupPost);

router.get('/logout', auth.logoutGet);

router.get('/about', about);

router.all('*', notFound);

module.exports = router;