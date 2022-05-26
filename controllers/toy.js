const formidable = require('formidable');
const path = require('path');
const fs = require('fs/promises');

module.exports = {
	get(req, res) {
		res.render('createToy', { title: 'Create Toy' })
	},
	post(req, res) {
		const form = new formidable.IncomingForm();
		const imagePath = path.normalize(path.join(__dirname, '../static/images/'));

		form.parse(req, (err, fields, files) => {
			const oldPath = files.toyimage.filepath;
			const newPath = imagePath + files.toyimage.originalFilename;
			if (fields.name && fields.description && files.toyimage.originalFilename) {
				const toy = {
					name: fields.name,
					description: fields.description,
					imageUrl: files.toyimage.originalFilename,
				}
				fs.copyFile(oldPath, newPath)
					.then(() => {
						console.log('File uploaded successfully');
					})
					.then(() => {
						req.toy.createToy(toy)
							.then(() => {
								res.redirect('/');
							})
							.catch(err => { throw err });
					}).catch(err => console.error(err));

			} else {
				console.log('Cannot create toy');
				res.redirect('/toy')
			}
		})
	}
}