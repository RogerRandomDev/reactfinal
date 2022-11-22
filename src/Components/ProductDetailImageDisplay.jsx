import {useReducer} from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
function ProductDetailImageDisplay({alternateImages}) {
  const initialState = {position: 0, image: alternateImages[0]};
  const imageMovingReducer = (state,action) =>{
    if(action.type === "LEFT"){
      const position = state.position===0 ? alternateImages.length-1 : state.position-1;
      return {position, image: alternateImages[position]}
    }
    if(action.type === "RIGHT"){
      const position = state.position === alternateImages.length-1 ? 0 :state.position+1;
      return {position, image: alternateImages[position]}
    }
    if(action.type === "SPECIFIC"){
      return {image: action.payload}
    }
    return new Error("No Matching Type");
  }

  const [state, dispatch] = useReducer(imageMovingReducer, initialState);

  return (
    <div className="grid md:grid-cols-4 gap-2 my-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl items-start mb-8 md:mb-auto md:max-h-full md:items-stretch">
                
                <div className="relative md:hidden">
                  <img src={state.image} alt="Product" className="max-w-full rounded object-contain mx-auto md:mx-0 md:w-full aspect-video max-h-[30rem] md:max-h-[unset] md:object-contain md:h-full"/>
                  <div onClick={()=>dispatch({type:"RIGHT"})} className="absolute border-2 rounded cursor-pointer bg-[#eee] p-3 text-neutral-900 top-1/2 right-0 -translate-y-1/2">
                    <BsChevronRight/>
                  </div>
                  <div onClick={()=>dispatch({type:"LEFT"})} className="absolute border-2 rounded cursor-pointer bg-[#eee] p-3 text-neutral-900 top-1/2 left-0 -translate-y-1/2">
                    <BsChevronLeft/>
                  </div>
                </div>
                <div className="flex gap-2 justify-center mt-4 md:hidden">
                  {new Array(alternateImages.length).fill().map((i,idx)=>{
                    return <div key={idx} className={`w-3 h-3 rounded-full bg-white ${idx==state.position ? "bg-opacity-100" : "bg-opacity-0"} transition border border-[#eee]`}></div>
                  })}
                </div>

                  <div className="col-span-4 hidden md:block">
                        <img src={state.image} alt="Product" className="max-w-full rounded object-contain mx-auto md:mx-0 md:w-full aspect-video max-h-[30rem] md:max-h-[unset] md:object-contain md:h-full"/>
                    </div>
                
                    {alternateImages.map((altImg,idx)=>{
                   return <div tabIndex={idx+1} className={`hidden md:block alternate-tab-pane md:self-start cursor-pointer ${altImg === state.image && 'outline outline-2 outline-[#eee] rounded'}`} key={idx} onClick={(e)=>dispatch({type:"SPECIFIC", payload:e.currentTarget.firstChild.src})}>
                        <img src={altImg} alt="Other Products" className="rounded w-full object-cover aspect-video"/>
                    </div>
                })}
            </div>
  )
}

export default ProductDetailImageDisplay