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
			req.app.locals.title = 'Delete ' + cat.name;
			res.render('delete')
		} else {
			res.redirect('/404');
		}
	},
	async post(req, res) {
		const id = req.params.id;
		try {
			await req.storage.deleteById(id, req.session.user._id);
			res.redirect('/');
		} catch (err) {
			console.error('Error deleting item in database')
			res.redirect('/404');
		}
	}
}