import Availability from "./Availability"
import LabeledDropdown from "./LabeledDropdown"
import ProductDetailPros from "./ProductDetailPros"
import Rating from "./Rating"

function ProductDetailInformation({company, title, reviewsCount, price, discount, description}) {
  return (
    <div>
        <a href="#" className="text-sm font-normal no-underline text-purple-800 hover:text-purple-900">{company}</a>
        <h2 className="text-neutral-900 text-2xl mb-6 mt-2 font-semibold">{title}</h2>
        <div className="flex gap-4 mb-6"><Rating rating={2.5}/> <p className="font-bold text-slate-400">·</p> <p className="text-slate-400">{reviewsCount} Customer Reviews</p></div>
        <div className="mb-2">
            <p className="text-red-400 font-bold text-xs mb-1">{discount*100}% OFF</p>
            <p className="text-xl font-semibold">Price: <span className="text-slate-400 line-through mr-4">${price} USD</span><span className="text-neutral-900">${price*(1-discount)} USD</span></p>
        </div>
        <Availability type={true}/>
        <div className="text-slate-400 font-normal leading-7 max-w-2xl">{description}</div>
        <ProductDetailPros data={["Sed ut perspiciatis unde", "Nemo enim ipsam voluptatem", "Temporibus autem quibusdam et", "Itaque earum rerum hic", "Donec quam felis ultricies nec"]}/>
        <div className="flex items-center gap-8">
          <LabeledDropdown label={"Quantity"} data={[1,2,3,4,5]}/>
          <LabeledDropdown label={"Size"} data={["Small","Medium","Large"]}/>
        </div>
    </div>
  )
}

export default ProductDetailInformation