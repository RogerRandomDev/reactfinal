import {useState} from 'react';
function ProductDetailImageDisplay({alternateImages}) {
  const [currentImageURL, setCurrentImageURL] = useState(alternateImages[0]);
  return (
    <div className="grid grid-cols-4 gap-2 w-full md:max-w-sm items-start mb-8 md:mb-0 md:h-full md:items-stretch">
                {/* {alternateImages.map((altImg,idx)=>{ */}
                  <div className="col-span-4">
                        <img src={currentImageURL} alt="image" className="max-w-full rounded object-contain mx-auto md:mx-0 md:w-full aspect-video max-h-[30rem] md:aspect-[unset] md:max-h-[unset] md:object-cover md:h-full"/>
                    </div>
                {/* })} */}
                    {alternateImages.map((altImg,idx)=>{
                   return <div tabIndex={idx+1} className={`hidden md:block alternate-tab-pane md:self-start cursor-pointer ${altImg == currentImageURL && 'outline outline-2 outline-neutral-600 rounded'}`} key={idx} onClick={(e)=>setCurrentImageURL(e.currentTarget.firstChild.src)}>
                        <img src={altImg} alt="image" className="max-w-full rounded"/>
                    </div>
                })}
            </div>
  )
}

export default ProductDetailImageDisplay