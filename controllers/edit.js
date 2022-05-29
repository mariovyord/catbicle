const formidable = require('formidable');

module.exports = {
	async get(req, res) {
		const id = req.params.id;
		const cat = await req.storage.getById(id);

		if (cat.owner.toString() !== req.session.user._id) {
			console.log('User is not owner');
			return res.redirect('/');
		}

		if (cat) {
			req.app.locals.cat = cat;
			req.app.locals.title = 'Edit ' + cat.name;
			res.render('edit')
		} else {
			res.redirect('/404');
		}
	},
	async post(req, res) {
		const form = new formidable.IncomingForm();
		const id = req.params.id;

		form.parse(req, (err, fields, files) => {
			const cat = {
				name: fields.name,
				description: fields.description,
				stars: parseInt(fields.stars),
			}
			req.storage.editById(id, cat, req.session.user._id)
				.then(() => {
					res.redirect('/');
				})
				.catch(err => {
					console.log(err.message);
					res.redirect('/404');
				});
		})
	}
}