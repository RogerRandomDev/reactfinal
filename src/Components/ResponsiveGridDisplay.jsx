function ResponsiveGridDisplay({ title, children }) {
  return (
    <div className="">
      <h3 className="mb-4 font-bold text-3xl text-center">{title}</h3>
      <div className="grid gap-12 items-start" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))" }}>
        {children}
      </div>
    </div>
  )
}

export default ResponsiveGridDisplay