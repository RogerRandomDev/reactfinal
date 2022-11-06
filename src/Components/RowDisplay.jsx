function RowDisplay({title, children}) {
  return (
    <div className="">
        <h3 className="mb-4 font-bold text-3xl">{title}</h3>
    <div className="flex gap-6 items-start">
    {children}
    </div>
    </div>
  )
}

export default RowDisplay