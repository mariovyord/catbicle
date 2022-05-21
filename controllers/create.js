const formidable = require('formidable');
const path = require('path');
const fs = require('fs/promises');

module.exports = {
	get(req, res) {
		res.render('create');
	},
	post(req, res) {
		const form = new formidable.IncomingForm();
		const imagePath = path.normalize(path.join(__dirname, '../static/images/'));

		form.parse(req, (err, fields, files) => {
			const oldPath = files.catimage.filepath;
			const newPath = imagePath + files.catimage.originalFilename;

			const cat = {
				name: fields.name,
				description: fields.description,
				imageUrl: files.catimage.originalFilename,
				stars: parseInt(fields.stars),
			}
			console.log(files);
			fs.copyFile(oldPath, newPath)
				.then(() => {
					console.log('File uploaded successfully');
				})
				.then(() => {
					req.storage.addCat(cat)
						.then(() => {
							res.redirect('/');
						})
						.catch(err => { throw err });
				}).catch(err => console.error(err));
			res.redirect('/');
		})

	}
}