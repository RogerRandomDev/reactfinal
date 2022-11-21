import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../Components/ProductCard"
import ResponsiveGridDisplay from "../Components/ResponsiveGridDisplay"
import SearchBar from "../Components/SearchBar"
import { sendRequest } from "../Utils/requests"

function Products() {

  const [products,setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(()=>{
    sendRequest("product/all", "GET", {}).then(items=>{
      let allProducts = JSON.parse(items);
      setProducts(allProducts.products);
      setLoading(false);
      // console.log(products);
    })
  },[loading]);

  return (
    !loading && 
    <div className="p-8 bg-[#404959] text-[#eee] min-h-[calc(100vh_-_56px)]">
        <h2 className="font-bold text-3xl">Products</h2>
        <div className="mt-8 mb-12"><SearchBar search={search} setSearch={setSearch}/></div>
       
        <ResponsiveGridDisplay title={""}>
          {
            products.map((p,idx)=>{
              if(search.length > 0){
                if(p.name.toLowerCase().includes(search.toLowerCase())){
                return <ProductCard key={idx} id={p._id} type="favorite" image={"https://res.cloudinary.com/dztnsrrta/image/upload/"+p.images[0]} title={p.name} price={p.price} location={p.Location} link={`/productDetail?id=${p._id}`}/>
              }else{
                return;
              }
            }
              return <ProductCard key={idx} id={p._id} type="favorite" image={"https://res.cloudinary.com/dztnsrrta/image/upload/"+p.images[0]} title={p.name} price={p.price} location={p.Location} link={`/productDetail?id=${p._id}`}/>
            })
          }
    </ResponsiveGridDisplay>
    </div>
  )
}

export default Products