import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {MdEdit, MdDelete} from 'react-icons/md';
function ProductCard({type="favorite", favoritePreset=false, image, title, price, location, link}) {
  const [favorited, setFavorited] = useState(favoritePreset);
  const navigate = useNavigate();
  return (
    <div onClick={(e)=>navigate("/productDetail")} className="flex flex-col justify-center gap-1 group cursor-pointer relative overflow-hidden">
          {
          type=="favorite" ? 
          <div className={`absolute top-4 left-4 text-2xl z-10 hover:scale-125 transition ${!favorited && "-translate-x-10"} group-hover:translate-x-0`}>
            <div onClick={()=>setFavorited(!favorited)}>
              {favorited ? <AiFillHeart className="text-red-400"/> : <AiOutlineHeart className="text-red-400"/>}
              </div>
              </div> 
              : 
              // <div className={`absolute top-4 left-4 text-2xl z-10 hover:scale-125 transition ${!favorited && "-translate-x-10"} group-hover:translate-x-0`}>
              <div className="z-10 text-2xl">
              <div style={{boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}} className={`border-[rgba(37,99,235,0.18)] backdrop-blur-sm bg-[rgba(37,99,235,0.4)] text-white absolute top-4 left-4 transition -translate-x-20 group-hover:-translate-x-4 rounded-tr rounded-br pl-8 pr-2 py-1`}><MdEdit className="hover:scale-125 transition"/></div>
              <div style={{boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}} className={`border-[rgba(248,113,113,0.18)] backdrop-blur-sm bg-[rgba(248,113,113,0.4)] text-white absolute top-4 right-4 transition translate-x-20 group-hover:translate-x-4 rounded-tl rounded-bl pr-8 pl-2 py-1`}><MdDelete className="hover:scale-125 transition"/></div>
              </div>
                // <div onClick={()=>setFavorited(!favorited)}>
                //   {favorited ? <AiFillHeart className="text-red-400"/> : <AiOutlineHeart className="text-red-400"/>}
                //   </div>
                  // </div>
                  }
        <a href={link} className="block relative">
            <div className="absolute inset-0 bg-[#121212] opacity-[0.2] hidden group-hover:block"></div>
            <img src={image} alt={"Product Image"} className="rounded w-full"/>
        </a>
        <a className="font-semibold text-lg group-hover:underline hover:underline" href={link}>{title}</a>
        <h3 className="text-base">${price}</h3>
        <h3 className="text-sm text-slate-400">{location}</h3>
    </div>
  )
}

export default ProductCard