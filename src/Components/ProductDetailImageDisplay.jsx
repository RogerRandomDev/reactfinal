import {useState} from 'react';
function ProductDetailImageDisplay({alternateImages}) {
  const [currentImageURL, setCurrentImageURL] = useState(alternateImages[0]);
  return (
    <div className="grid grid-cols-4 gap-2 my-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl items-start mb-8 md:mb-auto md:max-h-full md:items-stretch">
                {/* {alternateImages.map((altImg,idx)=>{ */}
                  <div className="col-span-4">
                        <img src={currentImageURL} alt="Product" className="max-w-full rounded object-contain mx-auto md:mx-0 md:w-full aspect-video max-h-[30rem] md:max-h-[unset] md:object-contain md:h-full"/>
                    </div>
                {/* })} */}
                    {alternateImages.map((altImg,idx)=>{
                   return <div tabIndex={idx+1} className={`hidden md:block alternate-tab-pane md:self-start cursor-pointer ${altImg === currentImageURL && 'outline outline-2 outline-neutral-600 rounded'}`} key={idx} onClick={(e)=>setCurrentImageURL(e.currentTarget.firstChild.src)}>
                        <img src={altImg} alt="Other Products" className="rounded w-full object-cover aspect-video"/>
                    </div>
                })}
            </div>
  )
}

export default ProductDetailImageDisplay