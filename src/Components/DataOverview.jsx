function DataOverview({fadedAccentColor, accentColor, Icon, data, description}) {
  return (
    <div className="bg-neutral-100 p-5 flex justify-between items-center rounded w-80">
        <div style={{backgroundColor:fadedAccentColor}} className={`rounded-full w-[4.5rem] h-[4.5rem] border border-[${accentColor}] grid place-items-center`}>
            <Icon className={`text-[${accentColor}] text-[20px]`}/>
        </div>
        <div>
            <div className="text-2xl font-semibold text-neutral-900 mb-2 tracking-wide">{data}</div>
            <div className="text-sm text-slate-400 font-normal ">{description}</div>
        </div>
    </div>
  )
}

export default DataOverview