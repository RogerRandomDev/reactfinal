import {BsArrowUp, BsArrowDown} from 'react-icons/bs'
function LabeledComparison({name, value, increasing}) {
  return (
    <div className="text-center flex flex-col items-center">
        <h5 className="mb-2 text-slate-400 text-base">{name}</h5>
        <div className="flex gap-2 items-center">
            {increasing ? <BsArrowUp className='text-green-400'/> : <BsArrowDown className='text-red-600'/>}
            <p className='text-neutral-900 font-semibold text-lg tracking-wide'>${value}</p>
        </div>
    </div>
  )
}

export default LabeledComparison