module.exports = {
	get(req, res) {
		const toys = req.toy.getAll().then(data => {
			req.app.locals.toys = data;
			req.app.locals.title = 'Add a Toy';
			console.log(data)
			res.render('addToy');
		})

	},
	post(req, res) {
		res.redirect('/');
	}
}