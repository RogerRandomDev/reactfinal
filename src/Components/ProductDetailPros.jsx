import {FiCheckCircle} from 'react-icons/fi';

function ProductDetailPros({data}) {
  return (
    <div className="grid grid-cols-2 justify-between max-w-2xl items-stretch gap-4 my-10 text-sm">
    {data.map(({val},id)=>{
       return <div className="flex gap-4 items-center" key={id}>
            <FiCheckCircle className='text-purple-400 w-4 h-4 flex-shrink-0'/>
            <p className='text-slate-400'>{val}</p>
        </div>
    })}
    </div>
  )
}

export default ProductDetailPros