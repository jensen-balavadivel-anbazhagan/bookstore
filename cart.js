import {openPopup} from "./books.js";

// Method to delete the book from the cart
export let deleteFromCart = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const URL = "http://localhost:3000/cart/delete/" +id;
  let response = await fetch(URL, options);
  let data = await response.json();
  return data;
};

// Method to decrease the number of book from the cart
export let removeBook = async (id) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const URL = "http://localhost:3000/cart/removeBook/" +id;
  let response = await fetch(URL, options);
  let data = await response.json();
  return data;
};

// Method to increase the number of book from the cart
export let addBook = async (id) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const URL = "http://localhost:3000/cart/addBook/" +id;
  let response = await fetch(URL, options);
  let data = await response.json();
  return data;
};

// Method to build the cart UI
export let getCart = async () => {
  
    const url = "http://localhost:3000/cart";
    let response = await fetch(url, { method: "GET" });
    let result = await response.json();
    let booksInCart = result.data;
    let cart = document.getElementById("shopping-cart");
    let totalPrice = 0;
    if (booksInCart != 'undefined' && booksInCart != null && booksInCart != '') {
        for (let book of booksInCart) {
            let item = document.createElement("div");
            item.classList.add("item");

            let buttonDiv = document.createElement("div");
            buttonDiv.classList.add("buttons");
            let deleteButton = document.createElement("img");
            deleteButton.classList.add("deleteBtn");
            deleteButton.addEventListener("click", async () => {
              deleteFromCart(book.isbn);
              item.remove();
            });
            deleteButton.src = "img/delete.png";
            buttonDiv.appendChild(deleteButton);
            item.appendChild(buttonDiv);

            let imageDiv = document.createElement("div");
            let image = document.createElement("img");
            image.src = book.image;
            imageDiv.classList.add("image");
            imageDiv.appendChild(image);
            item.appendChild(imageDiv);

            let details = document.createElement("div");
            details.classList.add("description");

            let title = document.createElement("span");
            title.innerText = "Title : " +book.title;

            let isbn = document.createElement("span");
            isbn.innerText = book.isbn;

            let author = document.createElement("span");
            author.innerText = "Author : " +book.author;

            let price = document.createElement("div");
            price.innerText = book.price + " kr";
            totalPrice = totalPrice + (Number(book.price) * Number(book.quantity));
            details.appendChild(title);
            //details.appendChild(isbn);
            details.appendChild(author);
            details.appendChild(price);
            item.appendChild(details);

            let quantity = document.createElement("div");
            let addQuantity = document.createElement("button");
            addQuantity.classList.add("addQty");
            let addImg = document.createElement("img");
            addImg.src = "img/plus.png";
            addQuantity.appendChild(addImg);
            addQuantity.addEventListener("click", async () => {
              addBook(book.isbn);
            });

            let remQuantity = document.createElement("button");
            remQuantity.classList.add("remQty");
            let remImg = document.createElement("img");
            remImg.src = "img/minus.png";
            remQuantity.appendChild(remImg);
            remQuantity.addEventListener("click", async () => {
              removeBook(book.isbn);
            });

            let quantityTxt = document.createElement("span");
            quantityTxt.innerText = book.quantity;

            quantity.appendChild(addQuantity);
            quantity.appendChild(quantityTxt);
            if(book.quantity > 0 ) {
            quantity.appendChild(remQuantity);
          }
            
            item.appendChild(quantity);
            cart.appendChild(item);
        
          }

    } else {
        let error = document.createElement("h5");
        error.innerText = "No books available";
        cart.appendChild(error);

}
document.getElementById('totalPrice').innerHTML = totalPrice ;
};
 
//Method to open the chat
document.getElementById('openChat').addEventListener('click', function(e){
  e.preventDefault();
  openPopup();
}
);

  window.onload = getCart();

 
