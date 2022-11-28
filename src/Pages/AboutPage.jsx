import AboutUs from "../Components/AboutPageAboutUs"
import TermsAndServices from "../Components/AboutPageTermsAndPrivacy"
function AboutPage() {
    return (
        <div className="bg-[#404959] text-[#eee] mt-[-.5rem]">
            <AboutUs />
            {/* <CompanyHistory /> */}
            <TermsAndServices />
        </div>
    )
}
export default AboutPage