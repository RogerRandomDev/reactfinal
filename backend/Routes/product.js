const express = require('express')
const cors = require('cors');
const {getProduct, getUserProducts, createProduct, updateProduct, deleteProduct} = require("../controllers/Product")
const router = express.Router();
router.options('*', cors());
router.use((req,res,next)=>{  
    next();
})

router.post('/createProduct', async (req,res) => {
    const {productData,userID,token} = JSON.parse(req.body);
    const creationResponse = await createProduct(productData,token,userID);
    res.status(200).send(creationResponse);
})
router.post('updateProduct/:productData', async (req,res)=> {
    const {productData,senderToken,productID} = JSON.parse(req.body)
    const updateResponse = await updateProduct(productID,productData,senderToken);
    res.status(200).send(updateResponse)
})

//shows products created by user with the matching id
router.post('/showUser', async (req,res) => {
    const {userID} = JSON.parse(req.body);
    const userProducts = await getUserProducts(userID);
    console.log(userID)
    console.log(userProducts)
    res.status(200).send({success:true,products:userProducts,msg:"returned products successfully"});
})
//shows product with the matching id
router.post('/show', async (req, res) => {
    const {productID} = JSON.parse(req.body);
    const productData = await getProduct(productID);
    res.status(200).send(productData);
  });

module.exports = router