import {FiCheckCircle} from 'react-icons/fi';

function ProductDetailPros({data}) {
  return (
    <div className="grid grid-cols-2 justify-between max-w-2xl items-stretch gap-4 my-10 text-sm">
    {data.map(item=>{
       return <div className="flex gap-4 items-center">
            <FiCheckCircle className='text-purple-400'/>
            <p className='text-slate-400'>{item}</p>
        </div>
    })}
    </div>
  )
}

export default ProductDetailPros