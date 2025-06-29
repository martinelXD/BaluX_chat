const form = document.getElementById('chat-form');
const input = document.getElementById('mensaje');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const texto = input.value.trim();
  if (!texto) return;

  // Mostrar mensaje del usuario
  chatBox.innerHTML += `<p><strong>Tú:</strong> ${texto}</p>`;
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Mostrar escribiendo...
  const escribiendo = document.createElement('p');
  escribiendo.textContent = 'Balu X está escribiendo...';
  chatBox.appendChild(escribiendo);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Verificar que puter esté disponible
  if (typeof puter === 'undefined' || !puter.ai) {
    escribiendo.remove();
    chatBox.innerHTML += `<p><strong>Balu X:</strong> ⚠️ No estás conectado a Puter. <br>Visita <a href="https://puter.com" target="_blank" style="color:#00bfa5;">puter.com</a> y entra con tu cuenta, luego vuelve.</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    return;
  }

  try {
    const res = await puter.ai.chat({
      model: 'claude-3-sonnet-20240229',
      messages: [{ role: 'user', content: texto }]
    });

    escribiendo.remove();
    chatBox.innerHTML += `<p><strong>Balu X:</strong> ${res.message.content}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    escribiendo.remove();
    chatBox.innerHTML += `<p><strong>Balu X:</strong> ❌ Error al contactar a la IA. ¿Estás logueado en Puter?</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    console.error('Error al usar Claude via Puter:', err);
  }
});
