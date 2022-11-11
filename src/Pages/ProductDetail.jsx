import ProductDetailImageDisplay from "../Components/ProductDetailImageDisplay"
import ProductDetailInformation from "../Components/ProductDetailInformation"

function ProductDetail({alternateImages}) {
  return (
    <div className="rounded p-8 grid bg-neutral-100 w-full grid-cols-1 md:gap-12 md:grid-cols-[auto_1fr] xl:grid-cols-[auto_auto] xl:justify-center lg:gap-48 items-start justify-items-center">
          <a href="#" className="text-sm font-normal no-underline text-purple-800 hover:text-purple-900 block md:hidden">Jack & Jill</a>
          <h2 className="text-neutral-900 text-2xl mb-6 mt-2 font-semibold w-max block md:hidden">The Hill of Jack and Jill</h2>
            <ProductDetailImageDisplay alternateImages={alternateImages}/>
            <ProductDetailInformation company="Jack &amp; Jill" title="The Hill of Jack and Jill" reviewsCount={36} price={80} discount={0.2} description="The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators."/>
    </div>
  )
}

export default ProductDetail