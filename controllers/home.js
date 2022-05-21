module.exports = {
	async home(req, res) {
		const cats = await req.storage.getAll();
		req.app.locals.cats = cats;
		req.app.locals.title = 'Home';
		res.render('index')
	}
}