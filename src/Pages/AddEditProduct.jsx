import React from 'react'
import ProductModifySection from '../Components/ProductModifySection'

function AddEditProduct() {
  return (
    <div className='text-slate-600 font-semibold text-2xl bg-slate-100 w-3/4 p-8'>{/*w + bg for testing*/}
    <h2 className='text-neutral-800 mb-8'>Add / Edit Product</h2>
    <div className="flex gap-8">
        <div className="w-1/2">
        <ProductModifySection header="General" data={[{name:"Product Name", type:"text"}, {name:"Price", type:"number"},{name:"Product Description", type:"textarea"}, {name:"Discount", type:"limitedNumber"},{name:"Status", type:"radio"}]}/>
        </div>
        <div className="w-1/2">
            <ProductModifySection header="Product Images" data={[{name:"Image",type:"image"}]}/>
            <ProductModifySection header="Pros" data={[{name:"Pros", type:"customAdd"}]}/>
            <ProductModifySection header="Specifications" data={[{name:"Size",type:"dropdown", items:["Small","Medium","Large"]}]}/>
        </div>
        
    </div>
    </div>
  )
}

export default AddEditProduct