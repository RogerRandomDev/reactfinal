const express = require('express')
const {getProduct, getUserProducts, createProduct, updateProduct, deleteProduct} = require("../controllers/Product")
const router = express.Router();

router.use((req,res,next)=>{  
    next();
})

router.post('/createProduct/:productData', async (req,res) => {
    const {productData,userToken} = req.params;
    const creationResponse = await createProduct(productData,userToken);
    res.status(200).send(creationResponse);
})
router.post('updateProduct/:productData', async (req,res)=> {
    const {productData,senderToken,productID} = req.params
    const updateResponse = await updateProduct(productID,productData,senderToken);
    res.status(200).send(updateResponse)
})

//shows products created by user with the matching id
router.get('/showUser/:userID', async (req,res) => {
    const {userID} = req.params;
    const userProducts = await getUserProducts(userID);
    res.status(200).send(userProducts)
})
//shows product with the matching id
router.get('/show/:productID', async (req, res) => {
    const {productID} = req.params;
    const productData = await getProduct(productID);
    res.status(200).send(productData);
  });

module.exports = router