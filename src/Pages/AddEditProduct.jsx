import React from 'react'
import { useReducer } from 'react';
import ProductModifySection from '../Components/ProductModifySection'

function AddEditProduct() {
  const initialState = {name:"",price:"",discount:"",description:"",status:"",images:[],pros:[],specifications:[]};
  const formReducer = (state,action)=>{
    if(action.type=="name"){
      return {...state, name:action.payload}
    }
    if(action.type=="price"){
      return {...state, price:action.payload}
    }
    if(action.type=="discount"){
      return {...state, discount:action.payload}
    }
    if(action.type=="description"){
      return {...state, description:action.payload}
    }
    if(action.type=="status"){
      return {...state, status:action.payload}
    }
    if(action.type=="images"){
      return {...state, images:action.payload}
    }
    if(action.type=="pros"){
      return {...state, pros:action.payload}
    }
    if(action.type=="specifications"){
      return {...state, specifications:action.payload}
    }
    throw new Error("No Matching Action Type");
  };
  const [state, dispatch] = useReducer(formReducer, initialState);
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch({type:"name",value:state.name});
    console.log(state);
    // let data = new FormData(formRef);
    // console.log(data);
  };
  return (
    <div className='text-slate-600 font-semibold text-2xl bg-slate-100 p-8'>{/*w + bg for testing*/}
    <h2 className='text-neutral-800 mb-8'>Add / Edit Product</h2>
    <form onSubmit={(e)=>handleSubmit(e)} className="grid gap-8 justify-center grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 3xl:grid-cols-3">
        <div className="">
        <ProductModifySection state={state} dispatch={dispatch} header="General" data={[{name:"Product Name", type:"text"}, {name:"Price", type:"number"},{name:"Product Description", type:"textarea"}, {name:"Discount", type:"limitedNumber"},{name:"Status", type:"radio"}]}/>
        </div>
        <div className="">
            <ProductModifySection state={state} dispatch={dispatch} header="Product Images" data={[{name:"Image",type:"image"}]}/>
        </div>
        <div className="">
            <ProductModifySection state={state} dispatch={dispatch} header="Pros" data={[{name:"Pros", type:"customAdd"}]}/>
            <ProductModifySection state={state} dispatch={dispatch} header="Specifications" data={[{name:"Size",type:"dropdown", items:["Small","Medium","Large"]}]}/>
        </div>
        <button type="submit" className='btn-primary w-1/2 mx-auto py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold text-lg mb-2 lg:row-start-3 lg:col-span-2 3xl:col-start-2 3xl:row-auto 3xl:col-span-1'>Submit</button>
    </form>
    </div>
  )
}

export default AddEditProduct