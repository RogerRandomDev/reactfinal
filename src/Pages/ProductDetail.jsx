import { useEffect } from "react";
import { useState } from "react"
import ProductDetailImageDisplay from "../Components/ProductDetailImageDisplay"
import ProductDetailInformation from "../Components/ProductDetailInformation"
import { sendRequest } from "../Utils/requests";
import { userContext } from "../Context/userContext";
import { useContext } from "react";
function ProductDetail() {
  const [productData, setProductData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const {state} = useContext(userContext);
  useEffect(()=>{
    const productID = window.location.search.substring(4);
    sendRequest("product/show", "POST", {body: {
      productID:productID
    },}).then(items=>{
      let allProducts = JSON.parse(items);
      setProductData(allProducts);
      sendRequest('user/show',"POST",{
        body:{
          "user":allProducts.creatorID
        }
      }).then(user=>{
        // console.log("26------------",user.success!==false);
        if(user.success !== false){
          setUserData(JSON.parse(user));
          setLoading(false);
        }
      })
    });
  },[loading]);
  return (
    (!loading && userData.success!==false) ? 
    <div className="rounded p-8 grid bg-neutral-100 w-full grid-cols-1 md:gap-12 xl:grid-cols-[auto_auto] xl:justify-center xl:gap-48 items-start justify-items-center">
          <a href={`/profile?id=${productData.creatorID}`} className="text-sm font-normal no-underline text-purple-800 hover:text-purple-900 block md:hidden">{userData.username}</a>
          <h2 className="text-neutral-900 text-2xl mb-6 mt-2 font-semibold w-max block md:hidden">{productData.name}</h2>
            <ProductDetailImageDisplay alternateImages={productData.images.map(i=>"https://res.cloudinary.com/dztnsrrta/image/upload/"+i)}/>
            <ProductDetailInformation creatorID={productData.creatorID} pros={productData.pros} status={productData.status} company={userData.username} image={"https://res.cloudinary.com/dztnsrrta/image/upload/"+userData.icon} memberSince={userData.joinDate} title={productData.name} reviewsCount={0} price={productData.price} discount={productData.discount/100} description={productData.description}/>
    </div>
    :
    <div>Loading!</div>
  )
}

export default ProductDetail