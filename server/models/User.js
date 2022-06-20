const { Schema, model, ObjectId } = require('mongoose');

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date },
  gender: { type: String },
  avatar: { type: String },
});

module.exports = model('User', User);
