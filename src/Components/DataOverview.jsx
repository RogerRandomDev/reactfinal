import propTypes from "prop-types"
function DataOverview({ fadedAccentColor, accentColor, Icon, data, description }) {
  return (
    <div className="bg-neutral-100 p-5 flex justify-between items-center rounded w-80">
      <div style={{ backgroundColor: fadedAccentColor, borderColor: accentColor }} className={`rounded-full w-[4.5rem] h-[4.5rem] border grid place-items-center`}>
        <Icon style={{ color: accentColor }} className={`text-[20px]`} />
      </div>
      <div>
        <div className="text-2xl font-semibold text-neutral-900 mb-2 tracking-wide">{data}</div>
        <div className="text-sm text-slate-400 font-normal ">{description}</div>
      </div>
    </div>
  )
}

DataOverview.propTypes = {
  fadedAccentColor: propTypes.string,
  accentColor: propTypes.string,
  Icon: propTypes.func,
  data: propTypes.string,
  description: propTypes.string
}

export default DataOverview