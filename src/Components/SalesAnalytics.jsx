import ApexColumnChart from "./ApexColumnChart"

import SearchBar from "./SearchBar"
function SalesAnalytics() {
  return (
    <div className="bg-neutral-100 p-5 rounded w-[70rem]">
      <SearchBar />
      <h3 className="font-semibold text-base text-neutral-900 mb-4">Sales Analytics</h3>
      <ApexColumnChart />
    </div>
  )
}

export default SalesAnalytics