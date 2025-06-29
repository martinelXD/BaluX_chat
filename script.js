const input = document.getElementById('input');
const askBtn = document.getElementById('askBtn');
const chatBody = document.getElementById('chatBody');

// Sonido tipo WhatsApp
const waSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_96d070b5de.mp3");
waSound.volume = 1;
waSound.load();

askBtn.addEventListener('click', async () => {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, 'user');
  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Si menciona WhatsApp, responde y redirige
  if (/whats?app|háblame|escríbeme/i.test(question)) {
    addMessage("Ok, prepárate vamos a entrar a WhatsApp 😎", 'bot');
    waSound.play();
    setTimeout(() => {
      window.location.href = "https://wa.me/tu_numero_aqui";
    }, 2000);
    return;
  }

  addMessage('Pensando... ', 'bot');

  try {
    const res = await puter.ai.chat(question, { model: 'claude-sonnet-4' });
    updateLastBotMessage(res.message.content[0].text);
  } catch (err) {
    updateLastBotMessage('Error: ' + err.message);
  }
});

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.classList.add('message', type);
  msg.textContent = text;
  chatBody.appendChild(msg);
}

function updateLastBotMessage(newText) {
  const messages = document.querySelectorAll('.message.bot');
  if (messages.length > 0) {
    messages[messages.length - 1].textContent = newText;
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}
