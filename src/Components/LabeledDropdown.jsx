function LabeledDropdown({label, data}) {
  return (
    <div className="flex gap-3 items-center">
        <p className="text-slate-600 font-semibold">{label}</p>
        <select className="py-1 px-4 border border-neutral-400 rounded">
            {data.map((option,id)=>{
                return <option key={id}>{option}</option>
            })}
        </select>
    </div>
  )
}

export default LabeledDropdown