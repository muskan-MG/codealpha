document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    // Replace with your WebSocket server URL
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = event.data;
        chatBox.prepend(botMessage);
    };

    sendBtn.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            // Display user message
            const userMessage = document.createElement("div");
            userMessage.className = "message user-message";
            userMessage.textContent = message;
            chatBox.prepend(userMessage);

            // Send message to WebSocket server
            socket.send(message);

            // Clear input field
            chatInput.value = '';
        }
    });

    chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });
});