require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);

//creates a product with the given data
const createProduct = async (productData) => {
    const product = await stripe.products.create({
        name: productData.name,
        description:productData.description
      });
    console.log(product)
    a()
}
const getProduct = async (productID) => {
    return await stripe.products.retrieve(
        productID
      );
}
//searches through all products
const searchProducts = async (query) => {
    query = Object.keys(query).reduce((a,b)=>a+(a!=''?" AND ":'')+b+":"+query[b],'')
    return await stripe.products.search({
        query
    })
}

const a=async()=>{
console.log(await searchProducts({"active":'\'true\''}))
}
