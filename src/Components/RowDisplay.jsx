function RowDisplay({ title, children }) {
  return (
    <div className="w-full">
      <h3 className={`mb-4 font-bold text-3xl ${children.length > 0 ? "xl:text-center" : "xl:text-left ml-16"} mx-auto text-center`}>{title}</h3>
      <div className="flex gap-6 items-start overflow-auto xl:ml-16 justify-center xl:justify-start">
        {children.length > 0 ?
          children.map((child, id) => <div key={id} className="min-w-[8rem]">{child}</div>)
          :
          children
        }
      </div>
    </div>
  )
}

export default RowDisplay