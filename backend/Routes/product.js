const express = require('express');
const cors = require('cors');
const {
  getAllProducts,
  getProduct,
  getFavoritedProducts,
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/Product');
const router = express.Router();
router.options('*', cors());
router.use((req, res, next) => {
  next();
});

router.post('/createProduct', async (req, res) => {
  const { productData, userID, token } = JSON.parse(req.body);
  const creationResponse = await createProduct(productData, token, userID);
  res.status(200).send(creationResponse);
});
router.post('/updateProduct', async (req, res) => {
  const { productData, senderToken, productID } = JSON.parse(req.body);
  const updateResponse = await updateProduct(
    productID,
    productData,
    senderToken
  );
  res.status(200).send(updateResponse);
});

// deletes product by id
router.delete('/deleteProduct', async (req, res) => {
  const { productID } = JSON.parse(req.body);
  await deleteProduct(productID);
  res.status(200).send({
    success: true,
    msg: 'Deleted Current Product',
  });
});

// shows all products
router.get('/all', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(200).send({
    success: true,
    products: allProducts,
    msg: 'returned products successfully',
  });
});

router.post('/favoritedProducts', async (req, res) => {
  const favorites = JSON.parse(req.body).favorites;
  let products = await getFavoritedProducts(favorites);
  // console.log(products);
  res.status(200).send(products);
});

//shows products created by user with the matching id
router.post('/showUser', async (req, res) => {
  const { userID } = JSON.parse(req.body);
  const userProducts = await getUserProducts(userID);
  res.status(200).send({
    success: true,
    products: userProducts,
    msg: 'returned products successfully',
  });
});
//shows product with the matching id
router.post('/show', async (req, res) => {
  const { productID } = JSON.parse(req.body);
  const productData = await getProduct(productID);
  res.status(200).send(productData);
});

module.exports = router;
