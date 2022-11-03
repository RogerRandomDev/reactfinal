import { useState } from 'react';
import { useRef } from 'react';
import { BsCloudUpload } from 'react-icons/bs'
import FileDisplay from './FileDisplay';
function ProductModifySection({header, data}) {
    const uploadedFiles = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);
    const handleFileSubmit = (fileInput) =>{
        setImageFiles(fileInput);
        // const files = fileInput.files;
        // files.forEach(file=>{
        //     reader.readAsDataURL(file);
        // })
    }
  return (
    <div className="bg-white rounded p-8 ">
        <h2 className='bg-slate-200 text-neutral-800 p-4 text-lg mb-6'>{header}</h2>
        <div className="flex flex-col justify-center gap-4">
        {data.map(({name, type, items=[]})=>{
            if(type=="text" || type=="number"){
            return <div className="text-base">
                <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name}</p>
                <input type={type} className="border-2 rounded p-2"/>
            </div>
            }else if(type=="textarea"){
                return <div className='text-base'>
                <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name}</p>
                <textarea name="" id="" className="border-2 rounded w-3/4 p-2"></textarea>
                </div>
            }else if(type=="limitedNumber"){
                return <div className="text-base">
                 <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name} (%)</p>
                <input type="number" min={0} max={99} className="border-2 rounded p-2"/>
                </div>
            }else if(type=="radio"){
                return <div className="text-sm">
                    <p className='text-neutral-800 font-semibold mb-2'>{name}</p>
                    <div className="flex items-center gap-2">
                    <input type="radio" name="status" value="Instock" id="status-instock"/>
                    <label htmlFor="status-instock">Instock</label>
                    <input type="radio" name="status" value="Unavailable" id="status-unavailable"/>
                    <label htmlFor="status-unavailable">Unavailable</label>
                </div></div>
            }else if(type=="image"){
                return <div className="text-base">
                <label for="product-file" className='cursor-pointer flex flex-col justify-center items-center gap-2 border-2 border-dashed border-slate-300 py-10 hover:border-slate-500 transition'>
                    <BsCloudUpload className='text-slate-400 text-4xl'/>
                    <p className='text-2xl text-neutral-800'>Click Here to Add Files</p>   
                    </label>
                    <input className='hidden' type="file" accept="image/*" name="file" id="product-file" multiple onChange={(e)=>handleFileSubmit(e.currentTarget)}/>
                    <div className="uploadedFiles" ref={uploadedFiles}></div>
                    {imageFiles.map(image=>{
                        <FileDisplay image={image}/>
                    })}
                </div>
            }else{
                return <div className=""></div>
            }
        })}
        </div>
    </div>
  )
}

export default ProductModifySection