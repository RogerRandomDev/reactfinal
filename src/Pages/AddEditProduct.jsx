import { useReducer, useContext, useEffect } from 'react';
import ProductModifySection from '../Components/ProductModifySection'
import { sendRequest } from '../Utils/requests';
import { userContext } from '../Context/userContext';
import { getLocal } from '../Utils/useLocalStorageAuth';
import { useState } from 'react';


function AddEditProduct() {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdding,setIsAdding] = useState(true);
  let productID = "";
  useEffect(()=>{
    productID = window.location.search.substring(4);
    if(productID.length > 10){
      setIsAdding(false);
      sendRequest('product/show', 'POST', {
      body: {
        productID:productID
      },
    }).then(product=>{
      setProductData(JSON.parse(String(product)));
    setLoading(false);
    console.log(productData);
    formDispatch({type:"name", payload:productData.name});
    formDispatch({type:"price", payload:productData.price});
    formDispatch({type:"discount", payload:productData.discount});
    formDispatch({type:"description", payload:productData.description});
    formDispatch({type:"status", payload:productData.status});
    productData.images && productData.images.map((image,id)=>{
      formDispatch({type:"addImages", payload:[`Image ${id+1}`, 4000000, "https://res.cloudinary.com/dztnsrrta/image/upload/"+image]});
    });
    formDispatch({type:"pros",payload:productData.pros});
    //specifications
    });
     }
  },[loading]);
  const {state, dispatch} = useContext(userContext);
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
    if(action.type=="addImages"){
      let data = [...state.images];
      data.push(action.payload);
      return {...state, images:data}
    }
    if(action.type=="removeImages"){
      let data = [...state.images];
      data = data.filter(d=>d[0]!==action.payload);
      return {...state, images:data}
    }
    if(action.type=="pros"){
      return {...state, pros:action.payload}
    }
    if(action.type=="specifications"){
      return {...state, specifications:action.payload}
    }
    throw new Error("No Matching Action Type");
  };
  const [formState, formDispatch] = useReducer(formReducer, initialState);
  
  // console.log(state);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    // formDispatch({type:"name",value:formState.name});
    console.log(state);
    var productData=formState;
    if(isAdding){
      await sendRequest("product/createProduct","POST",{
        body:{
          productData,
          userID:state.user._id,
          token:getLocal("token")
        }
      })
    }else{
      await sendRequest("product/updateProduct","POST",{
        body:{
          productData,
          productID:window.location.search.substring(4),
          senderToken:getLocal("token")
        }
      })
    }
  };
  return (
    <div className='text-slate-600 font-semibold text-2xl bg-slate-100 p-8'>{/*w + bg for testing*/}
    <h2 className='text-neutral-800 mb-8'>{isAdding ? "Add" : "Update"} Product</h2>
    <form onSubmit={(e)=>handleSubmit(e)} className="grid gap-8 justify-center grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 3xl:grid-cols-3">
        <div className="">
        <ProductModifySection state={formState} dispatch={formDispatch} header="General" data={[{name:"Product Name", type:"text"}, {name:"Price", type:"number"},{name:"Product Description", type:"textarea"}, {name:"Discount", type:"limitedNumber"},{name:"Status", type:"radio"}]}/>
        </div>
        <div className="">
            <ProductModifySection state={formState} dispatch={formDispatch} header="Product Images" data={[{name:"Image",type:"image"}]}/>
        </div>
        <div className="">
            <ProductModifySection state={formState} dispatch={formDispatch} header="Pros" data={[{name:"Pros", type:"customAdd"}]}/>
            <ProductModifySection state={formState} dispatch={formDispatch} header="Specifications" data={[{name:"Size",type:"dropdown", items:["Small","Medium","Large"]}]}/>
        </div>
        <button type="submit" className='btn-primary w-1/2 mx-auto py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold text-lg mb-2 lg:row-start-3 lg:col-span-2 3xl:col-start-2 3xl:row-auto 3xl:col-span-1'>{isAdding ? "Submit" : "Update"}</button>
    </form>
    </div>
  )
}

export default AddEditProduct