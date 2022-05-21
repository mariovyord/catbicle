module.exports = {
	async home(req, res) {
		const cats = await req.storage.getAll();
		req.app.locals.cats = cats;
		res.render('index')
	}
}