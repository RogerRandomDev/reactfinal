function ProductDetailImageDisplay({alternateImages}) {
  return (
    <div className="grid grid-cols-4 gap-2">
                {alternateImages.map((altImg,idx)=>{
                   return <div style={{display:idx==0 ? 'inline-block' : 'none'}}  className="col-span-4" key={idx}>
                        <img src={altImg} alt="image" className="max-w-full rounded"/>
                    </div>
                })}
                    {alternateImages.map((altImg,idx)=>{
                   return <div className="alternate-tab-pane" key={idx}>
                        <img src={altImg} alt="image" className="max-w-full rounded"/>
                    </div>
                })}
            </div>
  )
}

export default ProductDetailImageDisplay