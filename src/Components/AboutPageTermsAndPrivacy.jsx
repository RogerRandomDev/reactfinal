export default function AboutPageTermsAndPrivacy() {
    return (
        <div className="bg-[#404959] text-[#eee]">
            <h1 className="text-5xl mx-auto font-bold text-center">More Info</h1>
            <div className="flex w-1/2 mx-auto justify-center items-center text-center gap-x-5 pb-5">
                <div>
                    <p className="font-bold text-3xl mb-10 m-4">Terms of Service</p>
                    <a href="/about/terms" className="block mb-5 w-8/12 mx-auto align-middle border-2 rounded-full p-1 bg-blue-500 border-blue-500 border-10 text-white text-xl font-bold hover:bg-blue-600 outline-10 transition-colors hover:select-none hover:cursor-pointer">Learn More</a>
                </div>
                <div>
                    <p className="font-bold text-3xl mb-10 m-4">Privacy Policy</p>
                    <a href="/about/privacy" className="block mb-5 mx-auto w-8/12 align-middle border-2 rounded-full p-1 bg-blue-500 border-blue-500 border-10 text-white text-xl font-bold hover:bg-blue-600 outline-10 transition-colors hover:select-none hover:cursor-pointer">Learn More</a>
                </div>
            </div>
        </div>
    )
}
