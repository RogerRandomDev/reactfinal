import {useState} from 'react';
function ProductDetailImageDisplay({alternateImages}) {
  const [currentImageURL, setCurrentImageURL] = useState(alternateImages[0]);
  return (
    <div className="grid grid-cols-4 gap-2">
                {/* {alternateImages.map((altImg,idx)=>{ */}
                  <div className="col-span-4">
                        <img src={currentImageURL} alt="image" className="max-w-full rounded"/>
                    </div>
                {/* })} */}
                    {alternateImages.map((altImg,idx)=>{
                   return <div tabIndex={idx+1} className={`alternate-tab-pane cursor-pointer ${altImg == currentImageURL && 'outline outline-2 outline-neutral-600 rounded'}`} key={idx} onClick={(e)=>setCurrentImageURL(e.currentTarget.firstChild.src)}>
                        <img src={altImg} alt="image" className="max-w-full rounded"/>
                    </div>
                })}
            </div>
  )
}

export default ProductDetailImageDisplay