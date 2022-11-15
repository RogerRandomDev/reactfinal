import {CiCircleRemove} from 'react-icons/ci';
function FileDisplay({handleRemoveFile, name, size, image}) {
    // console.log(image);
  return (
    <div className="w-full rounded border p-2 flex justify-between items-center mt-4">
        <div className="flex gap-4 items-center">
        <img src={image} alt="Preview" className="object-cover w-12 h-12 rounded-full border border-slate-400"/>
            <div className="">
        <p>{name}</p>
        <p>{(size/1000000).toFixed(2)} MB</p>
        </div>
        </div>
<CiCircleRemove onClick={()=>handleRemoveFile(name)} className='text-2xl cursor-pointer text-slate-400 hover:text-red-400 transition'/>
    </div>
  )
}

export default FileDisplay