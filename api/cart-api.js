const express = require("express");
const router = express.Router();
const db = require('../db');

// Where we will have the selected books
let cart = db.getDbData("cart");

//Method to get all the books added in the cart
router.get('/', (req, res) => {
  console.log(`Get all the books from Cart `);
  console.log(cart);
   //if the cart is null or empty return error message
    if(cart === null && cart === '') {
      return res.status(400).json({
            status: "failure",
            message: "There is are no books in the cart"
          });
    } 
//if all the books are returned return success and the data
     res.status(200).json({
            status: "success",
            data : cart,
            message: "All books from cart are fetched"
          });
});


//Method to add newly selected books to the cart
router.post('/add/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    console.log(`Add book: ` + isbn);
    //Get the book details from the list available books
    const book = db.getBook("books",isbn);
    
    //if the selected book is available in the total books add the book to the cart and send success
    if (book != 'undefined' && book != null && book != '') {
        console.log(book);
        let bookInCart = db.getBook("cart", isbn);
        let quantity = 1;
       if (bookInCart != 'undefined' && bookInCart != null && bookInCart != '') {
        quantity = quantity + Number(bookInCart.quantity);
       }
       book.quantity = quantity;
       db.addBook("cart",book);
       //Check to see if the added book is now available in the cart if yes return success
       var addedBook = db.getBook("cart", isbn);
       if (addedBook != 'undefined' && addedBook != null && addedBook != '') {
       return res.status(200).json({
            status: "success",
            data : db.getDbData("cart"),
            message: "Successfully added the book"
          });
          //Check to see if the added book is now available in the cart and if not present then return failure
        } else {
            return res.status(404).json({
                status: "failure",
                message: "Requested Book is not added to the cart"
              });
        }

        // Return failure since the selected book is not available in the total books list
    } else {
       return res.status(404).json({
            status: "failure",
            message: "Requested Book is not found in the list"
          });
    }
   
});

// Method to increase the number of book from the cart
router.post('/addBook/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    console.log(`Add Quantity for book: ` + isbn);
        let bookInCart = db.getBook("cart", isbn);
        let quantity = 1;
       if (bookInCart != 'undefined' && bookInCart != null && bookInCart != '') {
        quantity = quantity + Number(bookInCart.quantity);
       }
       bookInCart.quantity = quantity;
       db.updateBook(bookInCart.quantity,quantity);
       return res.status(200).json({
            status: "success",
            data : db.getDbData("cart"),
            message: "Successfully added the book"
          });
   
});

// Method to decrease the number of book from the cart
router.post('/removeBook/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  console.log(`Remove Quantity for book: ` + isbn);
      let bookInCart = db.getBook("cart", isbn);
      let quantity = 1;
     if (bookInCart != 'undefined' && bookInCart != null && bookInCart != '') {
      quantity = Number(bookInCart.quantity) - quantity;
     }
     if(quantity <= 0) {
      db.removeBook("cart",bookInCart);
    } else {
      bookInCart.quantity = quantity;
      db.updateBook(bookInCart.quantity,quantity);
    }
     return res.status(200).json({
          status: "success",
          data : db.getDbData("cart"),
          message: "Successfully removed the book"
        });
 
});


//Method to add newly selected books to the cart
router.delete('/delete/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    //Get the book details from the cart
    console.log(`Delete book: ` + isbn);
    const book = db.getBook("cart",isbn);

    //if the selected book is available in the total books delete the book to the cart and send success
    if (book != 'undefined' && book != null && book != '') {
        console.log(book);
       db.removeBook("cart",book);

        //Check to see if the deleted book is now available in the cart if yes return failure
       var removedBook = db.getBook("cart", isbn);
       if (removedBook != 'undefined' && removedBook != null && removedBook != '') {
        return res.status(404).json({
            status: "failure",
            message: "Requested Book is not removed from the cart"
          });
        //Check to see if the deleted book is now available in the cart and if not present then return success
        } else {
            return res.status(200).json({
                status: "success",
                data : db.getDbData("cart"),
                message: "Successfully removed the book"
              });
    
        }

         // Return failure since the selected book is not available in the cart
    } else {
       return res.status(404).json({
            status: "failure",
            message: "Requested Book is not found in the cart"
          });
    }
});

// retrive a single book
router.get('/:isbn', (req, res) => {
  // Reading isbn from the URL
  const isbn = req.params.isbn;
  console.log(`Get book: ${isbn}` );
  var book = db.getBook("cart",isbn);
  console.log(book );
  // Searching books for the isbn
      if (book !== 'undefined' && book !== null && book !== '') {
        return res.status(200).json({
          status: "success",
          data : book
        });
      }
  // Sending 404 when the book is not found
  res.status(404).send('Book not found');
});

module.exports = router;