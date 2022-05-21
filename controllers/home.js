module.exports = {
	async home(req, res) {
		const query = req.query;
		const cats = await req.storage.getAll(query);
		req.app.locals.cats = cats;
		req.app.locals.title = 'Home';
		req.app.locals.query = query;
		res.render('index')
	}
}