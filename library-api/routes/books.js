// Criando as rotas
const express = require('express'); // Importa o express para criar o servidor
const Book = require('../models/book.js'); // Importa o modelo dos livros
const router = express.Router(); // Cria o roteador

// **** CRIAÇÃO (POST) ****
router.post('/', async (req, res) => {
    const { title, author, year } = req.body; // Extrai os dados da requisição
    try {
        const newBook = new Book({ title, author, year });
        await newBook.save();
        res.status(201).json(newBook); // Corrigido 'newBok' para 'newBook'
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

// **** LEITURA (GET) ****
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros', error }); // Corrigido 'livro' para 'livros'
    }
});

// **** ATUALIZAÇÃO (PUT) ****
router.put('/:id', async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
});

// **** EXCLUSÃO (DELETE) ****
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error }); // Corrigido para status 500
    }
});

// GET TITULO
router.get('/titulo/:title', (req, res) => {
    const titulo = req.params.title;
    if (!titulo) {
      res.status(400).send({ error: 'Título não informado' });
      return;
    }
  
    const livros = Books.find({ titulo: { $regex: titulo, $options: 'i' } });
    livros.then((livros) => {
      res.send(livros);
    }).catch((err) => {
      res.status(500).send({ error: 'Erro ao buscar livros' });
    });
});

module.exports = router;
