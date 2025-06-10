import secureLocalStorage from "react-secure-storage";

const storageHandler = (key, value, type) => {
  if (type === "clear") {
    return secureLocalStorage.clear();
  }
  if (type === "set") {
    return secureLocalStorage.setItem(key, value);
  }
  if (type === "get") {
    return secureLocalStorage.getItem(key);
  }
  if (type === "delete") {
    return secureLocalStorage.removeItem(key);
  }
};

export { storageHandler };
