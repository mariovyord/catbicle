module.exports = {
	async details(req, res) {
		const id = req.params.id;
		const cat = await req.storage.getById(id);

		if (cat) {
			req.app.locals.cat = cat;
			req.app.locals.title = cat.name;
			res.render('details')
		} else {
			res.redirect('/404');
		}
	}
}