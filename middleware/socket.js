// public/js/socket.js

const socket = io();

const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messageArea = document.getElementById('messageArea');

sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;
  messageInput.value = '';

  // Sunucuya mesajı gönder
  socket.emit('message', message);
});

// Sunucudan gelen mesajları dinle
socket.on('message', (message) => {
  // Gelen mesajı ekranda göster
  messageArea.innerHTML += `<p>${message}</p>`;
});
