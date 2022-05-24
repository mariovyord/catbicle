const formidable = require('formidable');

module.exports = {
	async get(req, res) {
		const id = req.params.id;
		const cat = await req.storage.getById(id);

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
			req.storage.editById(id, cat)
				.then(() => {
					res.redirect('/');
				})
				.catch(err => {
					res.redirect('/404');
				});
		})
	}
}