import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_tjg34y2";
const EMAILJS_TEMPLATE_ID = "template_hbm0qi4";
const EMAILJS_PUBLIC_KEY = "DDtNllazoBvPoGAhp";

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

function generateKeysForCart(cartItems) {
  return cartItems.map((item) => ({
    name: item.name,
    keys: Array.from({ length: item.amount }, () => generateFakeGameKey()),
  }));
}

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
    return { success: true, gameKeys };
  } catch (error) {
    return { success: false, gameKeys, error };
  }
}

export { generateFakeGameKey, generateKeysForCart, formatKeysForEmail };
