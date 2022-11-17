import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";




function Rating({rating}) {
  return (
    <div className="flex gap-2 items-center">
        {new Array(5).fill().map((i,idx)=>{
            return (idx+1 <= rating ? <BsStarFill key={idx} className="text-yellow-400"/> :  (idx+0.5 <=rating ? <BsStarHalf key={idx} className="text-yellow-400"/> : <BsStar key={idx}className="text-yellow-400"/>));
        })}
    </div>
  )
}

export default Rating