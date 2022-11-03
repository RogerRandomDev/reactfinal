import TermSection from "../Components/TermSection"
export default function PrivacyPolicy() {
    return (
        <div className="grid grid-rows-1 mx-auto w-1/3 mt-6">
            <h1 className="font-bold text-5xl text-center mb-8">Privacy Policy</h1>
            <TermSection title="General Information" body="None of your data is sold to third parties. All information you put into this website is stored on a private server." />
            <TermSection title="Sale information" body="Any successful purchase through the site is tracked by your bank/card holder, but we do not keep this information. A reciept can be viewed for up to 30 days after the purchase, and is deleted after the time period has elapsed." />
            <TermSection title="Advertisements" body="Advertisements are not targeted to you in any way; all advertisements are random. If you choose to visit a site linked to an advertisement, you acknowledge that those sites may track you." />
        </div>
    )
}