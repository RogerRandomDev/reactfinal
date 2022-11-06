function ProductCard({image, title, price, location, link}) {
  return (
    <div className="flex flex-col justify-center gap-1">
        <a href={link} className="block relative group">
            <div className="absolute inset-0 bg-[#121212] opacity-[0.2] hidden group-hover:block"></div>
            <img src={image} alt={"Product Image"} className="rounded w-full"/>
        </a>
        <a className="font-semibold text-lg group-hover:underline hover:underline" href={link}>{title}</a>
        <h3 className="text-base">${price}</h3>
        <h3 className="text-sm text-slate-400">{location}</h3>
    </div>
  )
}

export default ProductCard