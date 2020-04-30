const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const host = "localhost";
var http = require('http').createServer(app);
const path = require("path");

app.use(express.static(path.join(__dirname, "chat")));

const bookRoutes = require('./api/book-api');
const cartRoutes = require('./api/cart-api');
const chatRoutes = require('./api/chat-api');

app.use(cors());


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/booksApi', bookRoutes);
app.use('/cart', cartRoutes);
app.use('/chat', chatRoutes);

http.listen(port, host, () => console.log(`Bookstore api listening on port ${port}!`));
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat/chat.html');
  });
  
  io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on("chat_message", function(msg) {
        io.emit("chat message", {
          message: msg.message,
          user: socket.username
        });
      });

});

module.exports = app;