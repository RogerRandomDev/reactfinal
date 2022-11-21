import Availability from "./Availability"
import LabeledDropdown from "./LabeledDropdown"
import ProductDetailPros from "./ProductDetailPros"
import Rating from "./Rating"
import { Link } from "react-router-dom"

function ProductDetailInformation({pros, status, company, image, memberSince, creatorID, title, reviewsCount, price, discount, description}) {
  return (
    <div>
      <Link to={`/profile?id=${creatorID}`}>
      <div className="flex items-center gap-4 group cursor-pointer">
        <img src={image} alt="Profile Image" className="rounded-full w-16 h-16" />
        <div>
        <div className="text-lg font-normal no-underline text-purple-800 hover:text-purple-900 hidden md:block group-hover:underline">{company.charAt(0).toUpperCase() + company.slice(1)}</div>
        <p className="text-slate-400 text-sm">Member Since {memberSince}</p>
        </div>
      </div>
      </Link>
        <div className="my-8 border h-[1px] w-3/4 mx-auto"></div>
        <h2 className="text-neutral-900 text-2xl mb-6 mt-2 font-semibold w-max hidden md:block">{title}</h2>
        <div className="flex gap-4 mb-6 w-max mx-auto md:mx-0"><Rating rating={2.5}/> <p className="font-bold text-slate-400">·</p> <p className="text-slate-400">{reviewsCount} Customer Reviews</p></div>
        <div className="mb-2 w-max">
            <p className={`text-red-400 font-bold text-sm mb-1 ${discount == 0 && "hidden"}`}>{discount*100}% OFF</p>
            <p className="text-4xl font-semibold"><span className={`${discount==0 ? "text-neutral-900" : "text-slate-400 line-through"} mr-4`}>${price}</span><span className={`text-neutral-900 ${discount == 0 && "hidden"}`}>${(price*(1-discount)).toFixed(2)}</span></p>
        </div>
        <Availability type={status=="Instock"} labels={["Instock","Unavailable"]}/>
        <div className="text-slate-400 font-normal leading-7 max-w-2xl">{description}</div>
        <ProductDetailPros data={pros}/>
        <div className="flex items-center gap-8">
          <LabeledDropdown label={"Quantity"} data={[1,2,3,4,5]}/>
          <LabeledDropdown label={"Size"} data={["Small","Medium","Large"]}/>
        </div>
    </div>
  )
}

export default ProductDetailInformation