import {useState} from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
function ProductDetailImageDisplay({alternateImages}) {
  const [currentImageURL, setCurrentImageURL] = useState(alternateImages[0]);
  return (
    <div className="grid md:grid-cols-4 gap-2 my-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl items-start mb-8 md:mb-auto md:max-h-full md:items-stretch">
                
                <div className="relative">
                  <img src={currentImageURL} alt="Product" className="max-w-full rounded object-contain mx-auto md:mx-0 md:w-full aspect-video max-h-[30rem] md:max-h-[unset] md:object-contain md:h-full"/>
                  <div className="absolute border-2 rounded cursor-pointer border-neutral-900  bg-[#eee] p-4 text-neutral-900 top-1/2 right-0 -translate-y-1/2">
                    <BsChevronRight/>
                  </div>
                  <div className="absolute border-2 rounded cursor-pointer border-neutral-900  bg-[#eee] p-4 text-neutral-900 top-1/2 left-0 -translate-y-1/2">
                    <BsChevronLeft/>
                  </div>
                </div>
                <div className="flex gap-2 justify-center mt-4">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>

                  <div className="col-span-4 hidden md:block">
                        <img src={currentImageURL} alt="Product" className="max-w-full rounded object-contain mx-auto md:mx-0 md:w-full aspect-video max-h-[30rem] md:max-h-[unset] md:object-contain md:h-full"/>
                    </div>
                
                    {alternateImages.map((altImg,idx)=>{
                   return <div tabIndex={idx+1} className={`hidden md:block alternate-tab-pane md:self-start cursor-pointer ${altImg === currentImageURL && 'outline outline-2 outline-[#eee] rounded'}`} key={idx} onClick={(e)=>setCurrentImageURL(e.currentTarget.firstChild.src)}>
                        <img src={altImg} alt="Other Products" className="rounded w-full object-cover aspect-video"/>
                    </div>
                })}
            </div>
  )
}

export default ProductDetailImageDisplay