// Suponiendo que el nombre y avatar se guardaron en localStorage en el login
const nombre = localStorage.getItem("nombre") || "Usuario";
const avatar = localStorage.getItem("avatar") || "";

document.getElementById("nombre-usuario").textContent = nombre;

// Si hay avatar personalizado
if (avatar) {
  document.getElementById("avatar-usuario").src = avatar;
} else {
  // Si no hay imagen, usar avatar con letra
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#666";
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 50px Segoe UI";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(nombre[0].toUpperCase(), 50, 55);
  document.getElementById("avatar-usuario").src = canvas.toDataURL();
}

// Enviar mensaje
function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, true);
  input.value = "";

  setTimeout(() => {
    agregarMensaje("Hola, soy Balu X 😎", false);
  }, 1000);
}

function agregarMensaje(texto, esUsuario) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "mensaje " + (esUsuario ? "mensaje-usuario" : "mensaje-balu");

  const img = document.createElement("img");
  img.className = "avatar";
  img.src = esUsuario
    ? document.getElementById("avatar-usuario").src
    : "https://i.ibb.co/KcZbz0V/pug.png"; // Avatar de Balu

  const burbuja = document.createElement("div");
  burbuja.className = "burbuja";
  burbuja.textContent = texto;

  if (esUsuario) {
    div.appendChild(burbuja);
    div.appendChild(img);
  } else {
    div.appendChild(img);
    div.appendChild(burbuja);
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
