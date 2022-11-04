const storeLocal = (key, value) => {
  console.log('storing');
  localStorage.setItem(key, value);
};
const getLocal = (key) => {
  return localStorage.getItem(key);
};

export { storeLocal, getLocal };
