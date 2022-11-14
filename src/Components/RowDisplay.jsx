function RowDisplay({title, children}) {
  return (
    <div className="">
        <h3 className="mb-4 font-bold text-3xl">{title}</h3>
    <div className="flex gap-6 items-start overflow-auto">
    {children.map((child,id)=><div key={id} className="min-w-[8rem]">{child}</div>)}
    {/* {children} */}
    </div>
    </div>
  )
}

export default RowDisplay