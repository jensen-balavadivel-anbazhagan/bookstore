
// Method to build the books
export let getBooks = async () => {
  
    const url = "http://localhost:3000/booksApi";
    let response = await fetch(url, { method: "GET" });
    let result = await response.json();
    let books = result.data;
  
    let cart = document.getElementById("cart-section");
    if (books != 'undefined' && books != null && books != '') {
        for (let book of books) {
            let cartBody = document.createElement("div");
            cartBody.classList.add("item");

            let buttonDiv = document.createElement("div");
            buttonDiv.classList.add("buttons");

            let cartBooksRep = await fetch("http://localhost:3000/cart/"+book.isbn, {method: "Get"});
            let resp = await cartBooksRep.json();
            let cartBook = resp.data;

            let addButton = document.createElement("button");
            addButton.classList.add("addButton");
            if(cartBook == 'undefined' || cartBook == null || cartBook == '') {
              addButton.innerText = "Add to Cart";
              addButton.addEventListener("click", async () => {
                addToCart(book.isbn);
              });
           
          } else {
            addButton.innerText = "Book added to the cart";
            addButton.disabled = true;
          
          }

            let details = document.createElement("div");
            details.classList.add("description");
            let title = document.createElement("span");
            title.innerText = "Title : " + book.title;

            let isbn = document.createElement("span");
            isbn.innerText = book.isbn;

            let author = document.createElement("span");
            author.innerText = "Author : " +book.author;

            let imageDiv = document.createElement("span");
            let image = document.createElement("img");
            image.src = book.image;
            imageDiv.classList.add("image");
            imageDiv.appendChild(image);

            let price = document.createElement("div");
            price.innerText = book.price + " kr";
            details.appendChild(imageDiv);
            details.appendChild(title);
            //details.appendChild(isbn);
            details.appendChild(author);
            details.appendChild(price);
            cartBody.appendChild(details);
            buttonDiv.appendChild(addButton);
            details.appendChild(buttonDiv);
            cart.appendChild(cartBody);
        
          }

    } else {
        let error = document.createElement("h5");
        error.innerText = "No books available";
        appendNode(cart,error);

}
};
 

  window.onload = getBooks();
// Method to add books to the cart
  export let addToCart = async (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    const URL = "http://localhost:3000/cart/add/" +id;
    let response = await fetch(URL, options);
    let data = await response.json();
    return data;
  };

  //Method to open the chat
  document.getElementById('openChat').addEventListener('click', function(e){
    e.preventDefault();
    openPopup();
  }
  );

  export let openPopup = () => {
    var url = "http://localhost:3000";
    var width = 500;
    var height = 200;
    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2));
    var newWindow = window.open(url, "chat", 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
    
  }
  