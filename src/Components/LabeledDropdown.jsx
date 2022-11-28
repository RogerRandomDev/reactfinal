function LabeledDropdown({label, data}) {
  return (
    <div className="flex gap-3 items-center">
        <p className="text-[#eee] font-semibold">{label}</p>
        <select className="py-1 px-4 border border-neutral-400 rounded text-neutral-800">
            {data.map((option,id)=>{
                return <option key={id}>{option}</option>
            })}
        </select>
    </div>
  )
}

export default LabeledDropdown