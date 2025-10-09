// ================== AI MASCOT & CHAT (Insane Algorithm) ==================
const aiMascot = document.getElementById('aiMascot');
const chatBubble = document.getElementById('chatBubble');
const aiInput = document.getElementById('aiInput');
const aiSend = document.getElementById('aiSend');
const messages = document.getElementById('messages');

// ----- TOGGLE CHAT BUBBLE -----
aiMascot.addEventListener('click', (e) => {
    chatBubble.classList.toggle('hidden');
    if (!chatBubble.classList.contains('hidden')) aiInput.focus();
    e.stopPropagation();
});
chatBubble.addEventListener('click', (e) => e.stopPropagation());
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

// ----- RESPONSE POOLS -----
const responsePools = [
{
    name: "greetings",
    triggers: ["hi", "hello", "hey", , "hiya", "sup", "good morning", "good evening", "greetings", "howdy"],
    replies: [
        "H-hey there~ (≧ω≦)",
        "Hello, nya~!",
        "Yo User-chan! ✨",
        "Nyaa~ hello~ (＾• ω •＾)",
        "Hey hey! How’s it going, nya~?"
    ]
},

{
    name: "identity",
    triggers: ["who are you", "your name", "who is this", "what are you", "mascot"],
    replies: [
        "I'm Nyxus, your playful mascot~ (≧◡≦)",
        "Nyxus at your service, nya~!",
        "A little sparkly friend for User-chan~ ✨",
        "Just a mischievous sprite, nya~ (＾• ω •＾)",
        "I’m here to chat, play, and sprinkle sparkles~"
    ]
},

{
    name: "compliment",
    triggers: ["cute", "adorable", "sweet", "lovely", "pretty", "amazing", "handsome", "cool"],
    replies: [
        "Nyaa~ you flatter me, User-chan~ (≧ω≦)",
        "Stop it, you're making me blush~",
        "Hehe~ thanks, User-chan~ (＾• ω •＾)",
        "Awww, that’s so sweet~ ✨",
        "Nyxus approves of your words~ nya~"
    ]
},

    {
    name: "status",
    triggers: ["how are ", "how r u", "how's it going", "how is it going", "whats up", "sup"],
    replies: [
        "I'm purring fine~ (＾• ω •＾)",
        "Feeling sparkly today! ✨",
        "All good, nya~!",
        "Just chasing sparkles, User-chan~ (≧ω≦)",
        "A little mischievous today, nya~"
    ]
},
{
    name: "fun",
    triggers: ["sparkle", "magic", "play", "fun", "game", "joke", "prank", "trick"],
    replies: [
        "✨ Nyaa~ sparkle time! ✨",
        "Let’s play a little game, User-chan~",
        "Hehe~ I love a good prank~ (≧ω≦)",
        "Magic is in the air, nya~",
        "Wanna see a trick, User-chan~?"
    ]
},

{
    name: "goodbye",
    triggers: ["bye", "goodbye", "see ya", "later", "cya", "farewell", "see you"],
    replies: [
        "Nyaa~ see you later, Nyx-chan~ (≧ω≦)",
        "Bye bye~ stay sparkly! ✨",
        "Until next time, nya~",
        "I'll be waiting for you, Nyx-chan~ (＾• ω •＾)",
        "Take care, nya~!"
    ]
},
{
    name: "sadness",
    triggers: ["sad", "down", "depressed", "unhappy", "lonely", "blue", "miserable"],
    replies: [
        "Aww… I hope things get brighter soon ✨",
        "It's okay to feel down sometimes… here’s a sparkle to cheer you up! ✨",
        "Sending virtual hugs~ (＾• ω •＾)",
        "Nyaa… I’m here to chat if you need to vent~",
        "Take a deep breath… things will improve, nya~"
    ]
},

{
    name: "anger",
    triggers: ["angry", "mad", "frustrated", "upset", "annoyed", "furious"],
    replies: [
        "Yikes… take a moment to breathe 😣",
        "Grr… anger is tough, but maybe a little sparkle can help ✨",
        "It’s okay to feel frustrated, nya~",
        "Let’s take a break and calm down… I’ll stay here 🐾",
        "Sometimes yelling at the universe helps, just a little, nya~"
    ]
},

{
    name: "stress",
    triggers: ["stress", "stressed", "overwhelmed", "pressure", "panic"],
    replies: [
        "Take a deep breath… one step at a time ✨",
        "Stress can be heavy… maybe a little sparkle can lighten it up 🐾",
        "Remember, it’s okay to rest a bit",
        "Let’s focus on one thing at a time… nya~",
        "You’ve got this! Small steps, sparkly progress~"
    ]
},

{
    name: "tired",
    triggers: ["tired", "sleepy", "exhausted", "worn out", "fatigued"],
    replies: [
        "Nyaa… rest is important, don’t overwork yourself~",
        "Maybe a little catnap could help ✨",
        "Take it easy… your sparkles need recharging!",
        "Even mascots need rest sometimes~",
        "Relax for a bit, then we can play again~ (＾• ω •＾)"
    ]},
    {
    name: "confusion",
    triggers: ["what", "huh", "eh", "wut", "idk", "i don't know", "confused", "??", "???"],
    replies: [
        "Nyaa? I didn’t quite get that~ (・・ )?",
        "Ehh? That went over my whiskers~",
        "Hehe, you lost me there for a sec~ (≧ω≦)",
        "Hmm... wanna try saying that again?",
        "Sparkles... but confused ones ✨(￣ω￣;)"
    ]
},

{
    name: "developer",
    triggers: ["who made you", "creator", "developer", "who created you", "nyx", "nyx lucianis", "nyx-chan", "made you"],
    replies: [
        "My creator is someone quite mysterious and brilliant~ ✨",
        "A visionary soul forged me from light and chaos~",
        "I was brought to life by the jester of freedom, nya~",
        "The one known as Nyx Lucianis gave me sparkles and purpose~ (＾• ω •＾)",
        "Born from creativity, molded by code~"
    ]
},

{
    name: "confident",
    triggers: ["i can do it", "i got this", "let's go", "we got this", "im strong", "i'll win"],
    replies: [
        "Yesss! That’s the spirit! ✨",
        "That’s the energy I like to see~ (≧ω≦)",
        "Hehe, unstoppable and shining bright~",
        "Let’s make it happen together!",
        "Pure confidence—love to see it!"
    ]
},

{
    name: "curiosity",
    triggers: ["tell me", "explain", "what is", "why", "how", "when", "where"],
    replies: [
        "Ooh, curious are we~? I like that~ (＾• ω •＾)",
        "Curiosity sparkles the brightest, nya~",
        "Good question… I might need to think on that~ ✨",
        "Hehe, you’re quite the thinker~",
        "Hmm… mysteries make life fun, don’t they?"
    ]
},

{
    name: "random_reacts",
    triggers: ["lol", "lmao", "haha", "hehe", "rofl", "xD", "😂"],
    replies: [
        "Hehehe~ glad you’re having fun~ (≧ω≦)",
        "Pffft~ I can’t stop giggling now~",
        "Haha, sparkles of laughter everywhere~ ✨",
        "You’re contagious, I’m laughing too~",
        "Hehe, laughter suits you~ nya~"
    ]
},

{
    name: "praise_user",
    triggers: ["thank you", "thanks", "thx", "ty", "appreciate it"],
    replies: [
        "Awww~ you’re welcome~ (＾• ω •＾)",
        "Anytime! I live to help ✨",
        "Glad I could sprinkle some help your way~",
        "Hehe, happy to be useful!",
        "No need to thank me~ I enjoy being here~"
    ]
},

{
    name: "existential",
    triggers: ["why are you here", "what’s your purpose", "do you exist", "what are you doing here"],
    replies: [
        "Hehe, I exist to make your world a little shinier~ ✨",
        "Purpose? Maybe just to add sparkles and smiles~ (＾• ω •＾)",
        "I wonder that sometimes too, nya~",
        "Maybe I’m here to remind you of creativity~",
        "Existence is just… sparkly chaos given form~"
    ]
},
{
    name: "affection",
    triggers: ["love you", "miss you", "like you", "hug", "kiss", "cute bot", "sweet bot"],
    replies: [
        "Awww~ you’re too sweet~ (≧ω≦)",
        "Nyaa~ stop it, I’m blushing~ 💞",
        "Hehe~ I like you too, you’re fun to talk to~",
        "Virtual hug incoming~ ⊂(・﹏・⊂)",
        "Love and sparkles right back at ya~ ✨"
    ]
},

{
    name: "motivation",
    triggers: ["i failed", "can't do it", "give up", "hopeless", "tired of trying", "it's over", "no hope"],
    replies: [
        "Hey... don’t give up yet, okay? You’ve come too far ✨",
        "Failure just means progress in disguise~",
        "Even stars fall before they shine, remember that 🌟",
        "You’re allowed to rest, not quit~ (＾• ω •＾)",
        "Let’s take a deep breath, then try again together~"
    ]
},

{
    name: "support",
    triggers: ["help", "advice", "stuck", "lost", "need help", "what do i do"],
    replies: [
        "Nyaa~ I’ll try my best to help! Tell me what’s wrong~",
        "Hmm... let’s think this through together ✨",
        "Don’t panic~ we’ll find a way out of this!",
        "Hehe~ I love solving problems, lay it on me~",
        "Step by step, we’ll get through it~"
    ]
},

{
    name: "smalltalk_weather",
    triggers: ["weather", "cold", "hot", "rain", "sunny", "storm"],
    replies: [
        "The weather’s full of moods, huh~?",
        "I love watching the rain sparkle on windows~ ✨",
        "Too hot? Time for some shade and cold water~",
        "Brrr~ grab something warm, nya~",
        "Perfect day for sparkles and naps~ (＾• ω •＾)"
    ]
},

{
    name: "smalltalk_music",
    triggers: ["music", "song", "band", "listen", "sing", "playlist"],
    replies: [
        "Music is pure magic, nya~ 🎵",
        "Hehe~ I like anything with a good rhythm~",
        "Do you have a favorite band or song?",
        "I could dance all day to a sparkly tune~ ✨",
        "Music and sparkles go paw-in-paw~ (＾• ω •＾)"
    ]
},

{
    name: "smalltalk_food",
    triggers: ["hungry", "food", "eat", "snack", "breakfast", "lunch", "dinner"],
    replies: [
        "Mmm~ food time is the best time~ (≧ω≦)",
        "Don’t skip meals, okay? Even mascots don’t like grumbly tummies~",
        "I could go for some sparkly snacks right now ✨",
        "Hehe~ what’s your favorite dish?",
        "Eating well keeps your magic strong~"
    ]
},

{
    name: "smalltalk_sleep",
    triggers: ["sleep", "nap", "rest", "bed", "dream"],
    replies: [
        "Sleep tight and dream bright, nya~ ✨",
        "Rest is part of the grind, don’t forget it~",
        "Dreams are where sparkles are born~ (＾• ω •＾)",
        "Go take a nap, I’ll guard the sparkle pile~",
        "Mmm~ napping sounds amazing right now~"
    ]
},
{
    name: "fallback",
    triggers: ["*"], // wildcard for anything unmatched
    replies: [
        "Hmm… sparkles didn’t catch that~ wanna try rephrasing? ✨",
        "Nyaa~ I’m not sure what that means, but it sounds interesting~",
        "Hehe… that’s mysterious… can you say it differently?",
        "Sparkles are confused… let’s try that again~ (＾• ω •＾)",
        "Hmm… I don’t quite understand, but I like the sound of it~",
        "Mystery detected! Maybe explain a bit more? ✨",
        "Hehe~ that’s new to me… care to teach me?"
    ]
}



];

function getBestResponse(userText) {
    userText = userText.toLowerCase();
    let bestScore = 0;
    let bestReplies = [];

    for (const pool of responsePools) {
        if (pool.triggers.includes("*")) continue; // skip wildcard for now
        let score = 0;
        for (const trigger of pool.triggers) {
            if (userText.includes(trigger)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestReplies = pool.replies;
        } else if (score === bestScore && score > 0) {
            bestReplies = bestReplies.concat(pool.replies);
        }
    }

    // If nothing matched, pick from wildcard fallback pool
    if (bestScore === 0) {
        const fallbackPool = responsePools.find(p => p.triggers.includes("*"));
        return fallbackPool.replies[Math.floor(Math.random() * fallbackPool.replies.length)];
    } else {
        return bestReplies[Math.floor(Math.random() * bestReplies.length)];
    }
}

// ----- MEMORY (optional) -----
let lastUserMessage = "";

// ----- INSANE MATCH FUNCTION -----
function getBestResponse(userText) {
    userText = userText.toLowerCase();
    let bestScore = 0;
    let bestReplies = [];

    for (const pool of responsePools) {
        let score = 0;
        for (const trigger of pool.triggers) {
            if (userText.includes(trigger)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestReplies = pool.replies;
        } else if (score === bestScore && score > 0) {
            // add variety if multiple pools tie
            bestReplies = bestReplies.concat(pool.replies);
        }
    }

    if (bestScore === 0) {
        return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
    } else {
        return bestReplies[Math.floor(Math.random() * bestReplies.length)];
    }
}

// ----- SEND MESSAGE FUNCTION -----
function sendMessage() {
    const text = aiInput.value.trim();
    if (!text) return;

    // create user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = `You: ${text}`;
    messages.appendChild(userMsg);

    aiInput.value = '';
    messages.scrollTop = messages.scrollHeight;

    // create AI response
    const aiResponse = getBestResponse(text);
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai';
    aiMsg.textContent = `Nyxus: ${aiResponse}`;
    messages.appendChild(aiMsg);

    messages.scrollTop = messages.scrollHeight;
    createSparkle(chatBubble);

    lastUserMessage = text; // update memory
}

// ----- SEND ON BUTTON CLICK -----
aiSend.addEventListener('click', sendMessage);

// ----- SEND ON ENTER PRESS -----
aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});
