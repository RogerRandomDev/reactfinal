
function Table({th,data}) {
  return (
    <div className="bg-neutral-100 p-4 w-max rounded">
        <h4 className="font-semibold text-2xl mb-4">Recent Purchases</h4>
    
    <table>
         <tbody>
        <tr className="bg-slate-200">
            {th.map((headerName, idx)=>{
               return <th className="font-semibold py-4 px-2" key={idx}>{headerName}</th>
            })}
        </tr>
        {data.map(({profile, date, items, amount}, idx)=>{
             return (<tr key={idx} className="hover:bg-slate-200 transition">
                    <td className="p-4"><div className="flex gap-8 items-center"><img src="https://picsum.photos/200" className="rounded-full w-8 h-8 object-cover"/>{profile}</div></td>
                    <td className="p-4">{date}</td>
                    <td className="p-4"><div className="flex flex-col justify-center gap-2 items-center">{items.map(item=><div>{item}</div>)}</div></td>
                    <td className="p-4">{amount}</td>
            </tr>)
        })}
        </tbody>
    </table>
    </div>
  )
}

export default Table