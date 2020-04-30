const express = require("express");
const router = express.Router();
const db = require('../db');
// Where we will keep books
let books = db.getDbData("books");

//Method to get all the books details
router.get('/', (req, res) => {
    console.log(`Get all books`);
    if(books === null && books === '') {
      return res.status(404).json({
            status: "failure",
            message: "There is are no books available"
          });
    } 

     res.status(200).json({
            status: "success",
            data : books,
            message: "All books are fetched"
          });
});

// retrive a single book
router.get('/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
    console.log(`Get book: ${isbn}` );
    var book = db.getBook("books",isbn);
    // Searching books for the isbn
        if (book != 'undefined' && book != null && book != '') {
            res.json(book);
            return;
        }
    // Sending 404 when the book is not found
    res.status(404).send('Book not found');
});

module.exports = router;