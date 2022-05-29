const formidable = require('formidable');

module.exports = {
	get(req, res) {
		const toys = req.toy.getAll().then(data => {

			req.app.locals.toys = data;
			req.app.locals.title = 'Add a Toy';

			res.render('addToy');
		})

	},
	post(req, res) {
		const catId = req.params.id;
		const form = new formidable.IncomingForm();

		form.parse(req, (err, fields, files) => {
			if (err) {
				console.log('Error adding toy');
				console.log(err.message);
				res.redirect('/add-toy/' + catId);
			}
			if (fields.toys) {
				const toyId = fields.toys;

				req.storage.addToy(catId, toyId, req.session.user._id).then(() => {
					res.redirect('/');
				}).catch(err => {
					console.log('Error adding toy');
					console.log(err.message);
					res.redirect('/add-toy/' + catId);
				})
			} else {
				console.log('Field cannot be empty');
				res.redirect('/add-toy/' + catId);
			}
		})
	}
}