const socket = io();

const userList = document.getElementById("active_users_list");
const chat = document.getElementById("chat");
const message = document.getElementById("messageInput");
const sendBtn = document.getElementById("send_message_btn");
const roomList = document.getElementById("active_rooms_list");
const roomInput = document.getElementById("roomInput");
const roomAddBtn = document.getElementById("room_add_icon_holder");

const room = "Global";
let Myusername = "";

socket.on("connect", () => {
  Myusername = prompt("Enter your name");
  socket.emit("createUser", Myusername);
});

sendBtn.addEventListener("click", () => {
  socket.emit("sendMessage", message.value);
  message.value = "";
});

socket.on("updateChat", (username, data) => {
  if (username === "info") {
    chat.innerHTML = `<div class="announcement"><span>${data}</span></div>`;
  } else {
    chat.innerHTML += `<div class="message_holder ${
      Myusername === username ? "me" : ""
    }">
                                <div class="pic"></div>
                                <div class="message_box">
                                  <div id="message" class="message">
                                    <span class="message_name">${username}</span>
                                    <span class="message_text">${data}</span>
                                  </div>
                                </div>
                              </div>`;
  }

  chat.scrollTop = chat.scrollHeight;
});
