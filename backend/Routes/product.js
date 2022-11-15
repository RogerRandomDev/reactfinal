const express = require('express')
const cors = require('cors');
const {getProduct, getUserProducts, createProduct, updateProduct, deleteProduct} = require("../controllers/Product")
const router = express.Router();
router.options('*', cors());
router.use((req,res,next)=>{  
    next();
})

router.post('/createProduct', async (req,res) => {
    const {productData,userToken} = JSON.parse(req.body);
    const creationResponse = await createProduct(productData,userToken);
    res.status(200).send(creationResponse);
})
router.post('updateProduct/:productData', async (req,res)=> {
    const {productData,senderToken,productID} = JSON.parse(req.body)
    const updateResponse = await updateProduct(productID,productData,senderToken);
    res.status(200).send(updateResponse)
})

//shows products created by user with the matching id
router.get('/showUser', async (req,res) => {
    const {userID} = req.params;
    const userProducts = await getUserProducts(userID);
    res.status(200).send(userProducts)
})
//shows product with the matching id
router.get('/show', async (req, res) => {
    const {productID} = req.params;
    const productData = await getProduct(productID);
    res.status(200).send(productData);
  });

module.exports = router