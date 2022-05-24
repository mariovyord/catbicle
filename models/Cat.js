const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const catSchema = new Schema({
	name: { type: String },
	description: { type: String },
	imageUrl: { type: String },
	stars: { type: Number }
});

const Cat = model('Cat', catSchema);

module.exports = Cat;