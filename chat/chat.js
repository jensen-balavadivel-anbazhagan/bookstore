
let firstChat = true;
var socket = io();
            let chatText = document.getElementById('txt');
            let messages = document.getElementById('messages');
            let submit = document.getElementById('chatForm');
            // submit text message without reload/refresh the page
            submit.addEventListener("submit", function(e) {
                e.preventDefault(); // prevents page reloading
                socket.emit('chat_message', {
                    message: chatText.value,
                  });
                chatText.value = '';
                return false;
            });
            // append the chat text message
            socket.on('chat message', function(msg){
                let li = document.createElement("li");
                li.innerHTML = '<strong>' + msg.user + ': </strong>' + msg.message;
                messages.appendChild(li);
               if(firstChat) {
             
                    getQuestions();
                    firstChat = false;
                } else {
                    getAnswers(msg.message);
                }
               
            });
            // append text if someone is online
            socket.on('is_online', function(username) {
                let li = document.createElement("li");
                li.innerHTML = username;
                messages.appendChild(li);
            });
            // ask username
            var username = prompt('Please tell me your name');
            socket.emit('username', username);

            async function getQuestions() {
                let adminLi = document.createElement("li");
                adminLi.innerHTML = '<strong> Admin : </strong>' + "Hi! Please choose from below questions";
                const url = "http://localhost:3000/chat";
                let response = await fetch(url, { method: "GET" });
                let result = await response.json();
                let questions = result.data;
                let adminUl = document.createElement("ul");
             
                if (questions != 'undefined' && questions != null && questions != '') {
                    for (let question of questions) {
                       let subLi = document.createElement("li");
                       subLi.innerHTML = question.question;
                       adminUl.appendChild(subLi);
                    }
                } else {
                    let subLi = document.createElement("li");
                    subLi.innerHTML = "No questions available";
                    adminUl.appendChild(subLi);
                }
                
                adminLi.appendChild( adminUl);
                messages.appendChild(adminLi);
            }

            async function getAnswers(msg) {
               let keyWord = "";
               let adminLi = document.createElement("li");
                if(msg.toUpperCase().includes("ordered".toUpperCase())) {
                    keyWord = "orderedBooks";
                } else if(msg.toUpperCase().includes("more".toUpperCase())) {
                    keyWord = "moreBooks";
                } else if(msg.toUpperCase().includes("return".toUpperCase())) {
                    keyWord = "returnBooks";
                } else if(msg.toUpperCase().includes("cancel".toUpperCase())) {
                    keyWord = "cancelBooks";
                }
                const url = "http://localhost:3000/chat/" + keyWord;
                let response = await fetch(url, { method: "GET" });
                let result = await response.json();
                let answers = result.data;
                let adminUl = document.createElement("ul");
              
                    for (let answer of answers) {
                        if (answer.answer != 'undefined' && answer.answer != null && answer.answer != '') {
                        adminLi.innerHTML = '<strong> Admin : </strong>' + answer.answer;
                    }  else {
                        adminLi.innerHTML = '<strong> Admin : </strong> Please select a valid question from the list';
                      
                            let subLi = document.createElement("li");
                            subLi.innerHTML = answer.question;
                            adminUl.appendChild(subLi);
                       
                    }
                }
                adminLi.appendChild(adminUl);
                messages.appendChild(adminLi);
            }
            