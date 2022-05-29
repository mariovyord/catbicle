const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const Types = mongoose.Types;

const ToysSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' },
	imageUrl: { type: String, default: 'noImage.jpg' },
	count: { type: Number, min: 0 },
	owner: { type: Types.ObjectId, ref: 'User' },
})

const Toy = model('Toy', ToysSchema);

module.exports = Toy;