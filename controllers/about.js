module.exports = {
	about(req, res) {
		req.app.locals.title = 'About';
		res.render('about');
	}
}