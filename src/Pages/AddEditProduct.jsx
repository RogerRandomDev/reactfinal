import React from 'react'
import ProductModifySection from '../Components/ProductModifySection'

function AddEditProduct() {
  return (
    <div className='text-slate-600 font-semibold text-2xl bg-slate-100 p-8'>{/*w + bg for testing*/}
    <h2 className='text-neutral-800 mb-8'>Add / Edit Product</h2>
    <div className="grid gap-8 justify-center grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 3xl:grid-cols-3">
        <div className="">
        <ProductModifySection header="General" data={[{name:"Product Name", type:"text"}, {name:"Price", type:"number"},{name:"Product Description", type:"textarea"}, {name:"Discount", type:"limitedNumber"},{name:"Status", type:"radio"}]}/>
        </div>
        <div className="">
            <ProductModifySection header="Product Images" data={[{name:"Image",type:"image"}]}/>
        </div>
        <div className="">
            <ProductModifySection header="Pros" data={[{name:"Pros", type:"customAdd"}]}/>
            <ProductModifySection header="Specifications" data={[{name:"Size",type:"dropdown", items:["Small","Medium","Large"]}]}/>
        </div>
    </div>
    </div>
  )
}

export default AddEditProduct