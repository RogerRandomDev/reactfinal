function RecentPurchases({children}) {
  return (
    <div className="xl:px-20">
        {/* keep the line? */}
        <div className="my-8 border h-[1px] w-3/4 mx-auto"></div>
        <h2 className="text-3xl font-bold">Recent Purchases</h2>
        <div className="flex gap-20 mt-8 overflow-x-scroll xl:p-8 scrollbar scrollbar-thumb-gray-900 hover:scrollbar-thumb-[#0d225e] transition scrollbar-track-[#eee] scrollbar-thumb-rounded-xl">
        {children}
        </div>
    </div>
  )
}

export default RecentPurchases