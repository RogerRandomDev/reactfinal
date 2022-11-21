const storeLocal = (key, value) => {
  localStorage.setItem(key, value);
};
const getLocal = (key) => {
  return localStorage.getItem(key);
};

export { storeLocal, getLocal };
