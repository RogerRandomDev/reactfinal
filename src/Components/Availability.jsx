function Availability({type}) {
  return (
    <div className={`${type ? "text-green-600 bg-green-300" : "text-red-600 bg-red-300"} font-bold p-1 w-max rounded text-sm tracking-wide leading-4 my-10`}>{type ? "Instock" : "Unavailable"}</div>
  )
}

export default Availability