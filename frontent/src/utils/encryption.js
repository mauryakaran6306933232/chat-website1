// src/utils/encryption.js
import CryptoJS from 'crypto-js';

// ⚠️ IMPORTANT: In a real app, this key should be dynamic and generated securely per chat.
// For now, we use a strong static key to make it work.
const SECRET_KEY = "MY_SUPER_SECRET_CHAT_KEY_2024!";

// Encrypt a message
export const encryptMessage = (text) => {
  if (!text) return "";
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// Decrypt a message
export const decryptMessage = (ciphertext) => {
  if (!ciphertext) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Decryption failed"; // Fallback if decryption yields empty string
  } catch (error) {
    console.error("Decryption error:", error);
    return "Decryption failed";
  }
};