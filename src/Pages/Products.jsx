import ProductCard from "../Components/ProductCard"
import ResponsiveGridDisplay from "../Components/ResponsiveGridDisplay"
import SearchBar from "../Components/SearchBar"

function Products() {
  return (
    <div className="p-8 bg-neutral-100">
        <h2 className="font-bold text-3xl">Products</h2>
        <div className="mt-8 mb-12"><SearchBar/></div>
       
        <ResponsiveGridDisplay title={""}>
        {new Array(25).fill().map((_,idx)=>{
            return <ProductCard type="admin" image={`https://picsum.photos/400?random=${idx+6}`} title={"Logitech Gaming Mouse"} price={75} location={"Las Vegas, NV"} link={"#"}/>
        })}
    </ResponsiveGridDisplay>
    </div>
  )
}

export default Products