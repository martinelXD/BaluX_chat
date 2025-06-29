const form = document.getElementById('chat-form');
const input = document.getElementById('mensaje');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // 👈 Esto evita que la página se reinicie

  const texto = input.value.trim();
  if (!texto) return;

  // Mostrar mensaje del usuario
  chatBox.innerHTML += `<p><strong>Tú:</strong> ${texto}</p>`;
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Mostrar "escribiendo..."
  const escribiendo = document.createElement('p');
  escribiendo.textContent = 'Balu X está escribiendo...';
  chatBox.appendChild(escribiendo);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await puter.ai.chat({
      model: 'claude-3-sonnet-20240229',
      messages: [{ role: 'user', content: texto }]
    });

    escribiendo.remove();
    chatBox.innerHTML += `<p><strong>Balu X:</strong> ${res.message.content}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch {
    escribiendo.remove();
    chatBox.innerHTML += `<p><strong>Balu X:</strong> Ocurrió un error 😓</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
