function RecentPurchases({ children }) {
  return (
    <div className="xl:px-20">
      <div className="my-8 border h-[1px] w-full md:w-3/4 mx-auto"></div>
      <h2 className="text-3xl font-bold text-center">Recent Purchases</h2>
      <div className="flex flex-col md:flex-row gap-20 mt-8 pb-7 overflow-x-scroll scrollbar scrollbar-thumb-gray-900 hover:scrollbar-thumb-[#0d225e] transition scrollbar-track-[#eee] scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl">
        {children}
      </div>
    </div>
  )
}

export default RecentPurchases