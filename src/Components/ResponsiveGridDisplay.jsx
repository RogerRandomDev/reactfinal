function ResponsiveGridDisplay({ title, children }) {
  return (
    <div className="">
      <h3 className="mb-4 font-bold text-3xl text-center">{title}</h3>
      <div className="grid gap-12 items-start justify-center xl:justify-start grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(175px,1fr))]">
        {/* {children.every(c => c === undefined) ?
          <div className="text-2xl font-semibold whitespace-nowrap">No Products Match Search!</div>
          : children} */}
        {children}
      </div>
    </div>
  )
}

export default ResponsiveGridDisplay