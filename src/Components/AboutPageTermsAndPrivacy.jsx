export default function AboutPageTermsAndPrivacy() {
    return (
        <>
            <h1 className="text-4xl mx-auto mb-5 font-bold text-center">More Info</h1>
            <div className="flex w-1/2 mx-auto justify-center text-center gap-y-10 gap-x-10 mb-6">
                <div>
                    <p className="font-bold text-3xl mb-5">Terms of Service</p>
                    <a href="/about/terms" className="border-2 rounded-full p-1 border-blue-500 text-blue-500 text-xl font-bold hover:bg-blue-100 transition-colors hover:select-none hover:cursor-pointer">Learn More</a>
                </div>
                <div>
                    <p className="font-bold text-3xl mb-5">Privacy Policy</p>
                    <a href="/about/privacy" className="border-2 rounded-full p-1 border-blue-500 text-blue-500 text-xl font-bold hover:bg-blue-100 transition-colors hover:select-none hover:cursor-pointer">Learn More</a>
                </div>
            </div>
        </>
    )
}
