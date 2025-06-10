import CryptoJS from "crypto-js";

const env = process.env;

const encryptData = (message) => {
  // Encrypt
  // console.log(env);
  var ciphertext = CryptoJS.AES.encrypt(
    message,
    process.env.REACT_APP_SECRET_KEY
  ).toString();
  // console.log(ciphertext);
  return ciphertext;
};

const decryptSingleData = (message) => {
  // Decrypt
  let bytes = CryptoJS.AES.decrypt(message, process.env.REACT_APP_SECRET_KEY);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};

export { encryptData, decryptSingleData };
