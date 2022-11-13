import { useState } from "react";
import TableRow from "./TableRow";

function Table({search=false, title="", type, th,data}) {
  const [allChecked, setAllChecked] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const unCheck = () => {
    // console.log("running");
    setAllChecked(false)
  };
  return (
    <div className={`bg-neutral-100 p-4 ${type==="Full" ? "" : "w-max"} rounded`}>
        <h4 className="font-semibold text-2xl mb-4">{title}</h4>
        {search && <><label htmlFor="customers-search">Search:</label>
        <input type="text" className="mb-8 ml-4 border border-slate-400 rounded px-4 py-1" id="customers-search" value={customerSearch} onChange={(e)=>setCustomerSearch(e.currentTarget.value)}/></>}
        
    <table className={type==="Full" ? "w-full" : ""}>
         <tbody>
        <tr className="bg-slate-200">
            {th.map((headerName, idx)=>{
              if(headerName==="CHECKBOX"){
                return <th className="font-semibold py-4 px-2" key={idx}><input type="checkbox" onChange={()=>setAllChecked(!allChecked)}/></th>
              }
               return <th className="font-semibold py-4 px-2" key={idx}>{headerName}</th>
            })}
        </tr>
        {data.map((dataSet, idx)=>{
             return <TableRow key={idx} dataSet={dataSet} idx={idx} isChecked={allChecked} unCheck={unCheck} searchValue={customerSearch}/>
        })}
        </tbody>
    </table>
    </div>
  )
}

export default Table