const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  isbn: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Book', BookSchema);
