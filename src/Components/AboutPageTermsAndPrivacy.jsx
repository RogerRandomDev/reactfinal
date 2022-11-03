import History from "./AboutPageCompanyHistory"
export default function AboutPageTermsAndPrivacy() {
    return (
        <>
            <h1 className="text-5xl mx-auto mb-5 font-bold text-center">More Info</h1>
            <div className="flex w-1/2 mx-auto justify-center items-center text-center gap-x-10 mb-10">
                <div className="w-1/4">
                    <p className="font-bold text-3xl mb-10 align-top">Terms of Service</p>
                    <a href="/about/terms" className="align-middle border-2 rounded-full p-1 bg-blue-500 border-blue-500 border-10 text-white text-xl font-bold hover:bg-blue-600 outline-10 transition-colors hover:select-none hover:cursor-pointer">Learn More</a>
                </div>
                <History />
                <div className="w-1/4">
                    <p className="font-bold text-3xl mb-10">Privacy Policy</p>
                    <a href="/about/privacy" className="align-middle border-2 rounded-full p-1 bg-blue-500 border-blue-500 border-10 text-white text-xl font-bold hover:bg-blue-600 outline-10 transition-colors hover:select-none hover:cursor-pointer">Learn More</a>
                </div>
            </div>
        </>
    )
}
