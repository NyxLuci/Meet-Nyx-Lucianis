// ================== AI MASCOT & CHAT ==================
const aiMascot = document.getElementById('aiMascot');
const chatBubble = document.getElementById('chatBubble');
const aiInput = document.getElementById('aiInput');
const aiSend = document.getElementById('aiSend');
const messages = document.getElementById('messages');

// ----- TOGGLE CHAT BUBBLE -----
aiMascot.addEventListener('click', (e) => {
    chatBubble.classList.toggle('hidden'); // show/hide
    if (!chatBubble.classList.contains('hidden')) {
        aiInput.focus(); // focus input when opening
    }
    e.stopPropagation(); // prevent outside click from immediately closing
});

// ----- PREVENT CLICK PROPAGATION INSIDE CHAT -----
chatBubble.addEventListener('click', (e) => e.stopPropagation());

// ----- CLICK OUTSIDE TO CLOSE CHAT -----
document.addEventListener('click', (e) => {
    if (!chatBubble.contains(e.target) && e.target !== aiMascot) {
        chatBubble.classList.add('hidden');
    }
});

// ----- CREATE SPARKLE EFFECT -----
function createSparkle(parent) {
    const sparkle = document.createElement('div');
    sparkle.textContent = "✨";
    sparkle.style.position = 'absolute';
    sparkle.style.top = `${Math.random() * 80}%`;
    sparkle.style.left = `${Math.random() * 80}%`;
    sparkle.style.fontSize = `${10 + Math.random() * 10}px`;
    sparkle.style.opacity = '0.8';
    parent.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// ----- SEND MESSAGE FUNCTION (AI POWERED) -----
async function sendMessage() {
    const text = aiInput.value.trim();
    if (!text) return;

    // create user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = `You: ${text}`;
    messages.appendChild(userMsg);

    aiInput.value = '';
    messages.scrollTop = messages.scrollHeight;

    try {
        // send to AI server
        const res = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();

        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.textContent = `Nyxus: ${data.reply}`;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;

        // sparkles for fun
        createSparkle(chatBubble);

    } catch (err) {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.textContent = "Nyxus: Oopsie, something went wrong! (≧ω≦)";
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
        console.error(err);
    }
}

// ----- SEND ON BUTTON CLICK -----
aiSend.addEventListener('click', sendMessage);

// ----- SEND ON ENTER PRESS -----
aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});
