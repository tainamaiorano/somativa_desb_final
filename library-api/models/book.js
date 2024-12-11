const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number},
    isbn: {type: Number, required: true}
})

//exportanto o modelo paa salvar os livros

module.exports = mongoose.model('Book', bookSchema);