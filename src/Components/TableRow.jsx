import {useState, useEffect} from 'react'
import { FaUserCircle } from "react-icons/fa";
import {ImBlocked} from "react-icons/im";
import Availability from "./Availability";

function TableRow({searchValue,isChecked, dataSet,idx, unCheck}) {
    const [checked,setChecked] = useState(false);
    useEffect(()=>{
        setChecked(isChecked);
        // console.log(checked, isChecked);
    },[isChecked]);
  return (
    searchValue.length===0 || dataSet["profile"].toLowerCase().includes(searchValue.toLowerCase()) ? <tr key={idx} className={`${checked || 'hover:bg-slate-200'} transition text-center ${checked && "bg-blue-200"}`}>
                  {Object.keys(dataSet).map((key,index)=>{
                    if(key=="checkbox"){
                      return <td className="p-4" key={index}>
                        <input type="checkbox" checked={checked} onChange={()=>{setChecked(!checked); unCheck()}}/>
                      </td>
                    }else if(key=="profile"){
                      return <td className="p-4" key={index}><div className="flex gap-8 items-center justify-center"><img src="https://picsum.photos/200" className="rounded-full w-8 h-8 object-cover"/>{dataSet[key]}</div></td>
                    } else if(key=="items"){
                      return <td className="p-4" key={index}><div className="flex flex-col justify-center gap-2 items-center">{dataSet[key].map(item=><div>{item}</div>)}</div></td>
                    }else if(key=="status"){
                      return <td className={`p-4`} key={index}><Availability design="small" type={dataSet[key] !== "Blocked"} labels={["Active","Blocked"]}/></td>
                    }else if(key=="action"){
                      return <td className="p-4" key={index}>
                        <div className="flex gap-4 items-center justify-center text-slate-600 cursor-pointer">
                      <FaUserCircle className="transition hover:text-blue-400"/>
                      <ImBlocked className="transition hover:text-red-400"/>
                        </div>
                      </td>
                    }else{
                      return <td className="p-4" key={index}>{dataSet[key]}</td>
                    }
                  })}
            </tr> : <></>)
}

export default TableRow