const storeLocal = (key, value) => {
  localStorage.setItem(key, value);
};
const getLocal = (key) => {
  localStorage.getItem(key);
};

export { storeLocal, getLocal };
