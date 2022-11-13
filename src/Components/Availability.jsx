function Availability({design, type, labels}) {
  return (
    <div className={`${type ? "text-green-600 bg-green-300" : "text-red-600 bg-red-300"} font-bold p-1 w-max rounded text-sm tracking-wide leading-4 ${design==="small" ? "mx-auto" : "my-10"}`}>{type ? labels[0] : labels[1]}</div>
  )
}

export default Availability