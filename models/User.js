const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const { comparePassword, hashPassword } = require('../services/util');

const userSchema = new Schema({
	username: { type: String, required: true, minlength: [3, 'Minimum length is 3 characters'], maxlength: [20, 'Maximum length is 20 characters'], unique: true },
	hashedPassword: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (password) {
	return await comparePassword(password, this.hashedPassword);
};

userSchema.pre('save', async function (next) {
	if (this.isModified('hashedPassword')) {
		this.hashedPassword = await hashPassword(this.hashedPassword);
		console.log('Hashing new password');
	}
	next();
})

const User = model('User', userSchema);

module.exports = User;