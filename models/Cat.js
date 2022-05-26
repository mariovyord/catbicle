const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const Types = mongoose.Types;

const catSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' },
	imageUrl: { type: String, default: 'noImage.jpg' },
	stars: { type: Number, min: 0, max: 10000, required: true },
	toys: { type: [Types.ObjectId], default: [], ref: 'Toy' },
});

const Cat = model('Cat', catSchema);

module.exports = Cat;