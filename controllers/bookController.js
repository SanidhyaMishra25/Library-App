const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createBook = async (req, res) => {
  const { title, author, description, isbn } = req.body;

  try {
    let book = await Book.findOne({ isbn });

    if (book) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    book = new Book({ title, author, description, isbn });
    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getBookById = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, author, description, isbn } = req.body;

  try {
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.description = description;
    book.isbn = isbn;

    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.remove();

    res.json({ message: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
