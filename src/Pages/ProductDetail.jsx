import { useEffect } from "react";
import { useState } from "react"
import ProductDetailImageDisplay from "../Components/ProductDetailImageDisplay"
import ProductDetailInformation from "../Components/ProductDetailInformation"
import { sendRequest } from "../Utils/requests";
import { userContext } from "../Context/userContext";
import { useContext } from "react";
function ProductDetail() {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const {state} = useContext(userContext);
  useEffect(()=>{
    const productID = window.location.search.substring(4);
      sendRequest('product/show', 'POST', {
      body: {
        productID:productID
      },
    }).then(product=>{
      setProductData(JSON.parse(String(product)));
    setLoading(false);
    });
  },[loading]);
  return (
    !loading ? 
    <div className="rounded p-8 grid bg-neutral-100 w-full grid-cols-1 md:gap-12 xl:grid-cols-[auto_auto] xl:justify-center xl:gap-48 items-start justify-items-center">
          <a href="/" className="text-sm font-normal no-underline text-purple-800 hover:text-purple-900 block md:hidden">{state.user.username}</a>
          <h2 className="text-neutral-900 text-2xl mb-6 mt-2 font-semibold w-max block md:hidden">{productData.name}</h2>
            <ProductDetailImageDisplay alternateImages={productData.images.map(i=>"https://res.cloudinary.com/dztnsrrta/image/upload/"+i)}/>
            <ProductDetailInformation pros={productData.pros} status={productData.status} company={state.user.username} title={productData.name} reviewsCount={0} price={productData.price} discount={0} description={productData.description}/>
    </div>
    :
    <div>Loading!</div>
  )
}

export default ProductDetail