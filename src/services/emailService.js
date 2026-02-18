import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_b9sac3c"; // Ej: "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_6a3pes4"; // Ej: "template_xyz789"
const EMAILJS_PUBLIC_KEY = "TtTYSXYp4LOzNoH97K"; // Ej: "abcDEF123456"

/**
 * Genera una key falsa de juego con formato XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
 */
function generateFakeGameKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = 5;
  const segmentLength = 5;
  const parts = [];

  for (let i = 0; i < segments; i++) {
    let segment = "";
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    parts.push(segment);
  }

  return parts.join("-");
}

/**
 * Genera las keys para todos los items del carrito
 * @param {Array} cartItems
 * @returns {Array}
 */
function generateKeysForCart(cartItems) {
  return cartItems.map((item) => ({
    name: item.name,
    keys: Array.from({ length: item.amount }, () => generateFakeGameKey()),
  }));
}

/**
 * Formatea las keys en un texto legible para el email
 */
function formatKeysForEmail(gameKeys) {
  return gameKeys
    .map((game) => {
      const keysList = game.keys
        .map((key, i) => `  ${i + 1}. ${key}`)
        .join("\n");
      return `🎮 ${game.name}\n${keysList}`;
    })
    .join("\n\n");
}

/**
 * Envía un email con las keys de los juegos comprados
 * @param {string} userEmail - Email del usuario
 * @param {string} userName - Nombre del usuario
 * @param {Array} cartItems - Items del carrito [{name, amount, price}]
 * @param {number} total - Total de la compra
 */
export async function sendPurchaseEmail(userEmail, userName, cartItems, total) {
  const gameKeys = generateKeysForCart(cartItems);
  const keysText = formatKeysForEmail(gameKeys);

  const templateParams = {
    to_email: userEmail,
    to_name: userName || userEmail.split("@")[0],
    game_keys: keysText,
    total_amount: `$${total.toFixed(2)}`,
    purchase_date: new Date().toLocaleString(),
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY,
    );
    console.log("📧 Email enviado:", result.text);
    return { success: true, gameKeys };
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    return { success: false, gameKeys, error };
  }
}

export { generateFakeGameKey, generateKeysForCart, formatKeysForEmail };
