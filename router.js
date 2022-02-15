const express = require('express');
const router = express.Router();
const books = require('./library');

// book is item, books is catalog, library is page
router.get('/book', books.index); //* index
router.get('/book/:id', books.show); //* show
router.delete('/book/:id', books.delete); //* delete
router.post('/book/create', books.create); //* create
router.put('/book/:id', books.update); //* update

module.exports = router;