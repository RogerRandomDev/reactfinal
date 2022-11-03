import ProductDetailImageDisplay from "../Components/ProductDetailImageDisplay"
import ProductDetailInformation from "../Components/ProductDetailInformation"

function ProductDetail({alternateImages}) {
  return (
    <div className="rounded p-4 flex gap-12 bg-neutral-100 w-5/6">
        <div className="w-[30%]">
            <ProductDetailImageDisplay alternateImages={alternateImages}/>
        </div>
        <div className="w-[70%]">
            <ProductDetailInformation company="Jack &amp; Jill" title="The Hill of Jack and Jill" reviewsCount={36} price={80} discount={0.2} description="The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators."/>
        </div>
    </div>
  )
}

export default ProductDetail