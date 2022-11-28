import Availability from "./Availability"
import LabeledDropdown from "./LabeledDropdown"
import ProductDetailPros from "./ProductDetailPros"
import Rating from "./Rating"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import propTypes from "prop-types"

function ProductDetailInformation({ pros, status, company, image, memberSince, creatorID, title, reviewsCount, price, discount, description }) {
  return (
    <div className="">
      <Link to={`/profile?id=${creatorID}`} className="hidden xl:block">
        <div className="items-center gap-4 group cursor-pointer flex">
          <img src={image} alt="Profile Image" className="rounded-full w-16 h-16" />
          <div>
            <div className="text-lg font-normal no-underline text-blue-400 hover:text-blue-600 group-hover:underline">{company.charAt(0).toUpperCase() + company.slice(1)}</div>
            <p className="text-[#eee] text-sm">Member Since {memberSince}</p>
          </div>
        </div>
      </Link>
      <div className="my-8 border h-[1px] w-3/4 mx-auto hidden xl:flex"></div>
      <h2 className="text-2xl mb-6 mt-2 font-semibold w-max hidden md:block">{title}</h2>
      <div className="flex gap-4 mb-6 w-max mx-auto md:mx-0"><Rating rating={2.5} /> <p className="font-bold text-[#eee]">·</p> <p className="text-[#eee]">{reviewsCount} Customer Reviews</p></div>
      <div className="mb-2 w-max">
        <p className={`text-red-400 font-bold text-sm mb-1 ${discount == 0 && "hidden"}`}>{discount * 100}% OFF</p>
        <p className="text-4xl font-semibold"><span className={`${discount == 0 ? "text-blue-400" : "text-[#eee] line-through"} mr-4`}>${price}</span><span className={`text-blue-400 ${discount == 0 && "hidden"}`}>${(price * (1 - discount)).toFixed(2)}</span></p>
      </div>
      <Availability type={status == "Instock"} labels={["Instock", "Unavailable"]} />
      <div className="text-[#eee] font-normal leading-7 max-w-2xl">{description}</div>
      <ProductDetailPros data={pros} />
      <div className="flex items-center gap-8">
        <LabeledDropdown label={"Quantity"} data={[1, 2, 3, 4, 5]} />
        <LabeledDropdown label={"Size"} data={["Small", "Medium", "Large"]} />
      </div>
      <button className="btn-primary mt-8 w-full mb-5 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold flex items-center justify-center gap-4">
        <AiOutlineShoppingCart />
        <p>Purchase</p>
      </button>
    </div>
  )
}

ProductDetailInformation.propTypes = {
  pros: propTypes.array,
  status: propTypes.string,
  company: propTypes.string,
  image: propTypes.string,
  memberSince: propTypes.string,
  creatorID: propTypes.string,
  title: propTypes.string,
  reviewsCount: propTypes.number,
  price: propTypes.number,
  discount: propTypes.number,
  description: propTypes.string
}

export default ProductDetailInformation