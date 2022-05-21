module.exports = {
	get(req, res) {
		res.render('create');
	},
	post(req, res) {
		const cat = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			stars: parseInt(req.body.stars),
		}
		req.storage.addCat(cat);
		res.redirect('/');
	}
}