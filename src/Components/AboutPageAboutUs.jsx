import Person from "./AboutPerson"
function AboutUs() {
    return (
        <div className="bg-[#404959] text-[#eee]">
            <div className="w-9/12 md:w-6/12 mb-5 mx-auto pt-4">
                <h1 className="text-5xl mx-auto mb-5 mt-6 text-center"><b>About Us</b></h1>
                <img src="https://picsum.photos/500/300" alt="the team" className="mx-auto mb-3 w-500 h-300"></img>
                <p className="mb-5 mx-auto text-center w-3/4">We are a group of 4 people who moderately dislike big chungus. We also like e-commerce apps for free money.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-9/12 mx-auto justify-center text-center mt-5 gap-x-7">
                <Person nam="Roger" title="Team Manager and Backend" desc="Roger is the incarnation of human suffering and spite born soley to bask in the pain of others." />
                <Person nam="Trent" title="Frontend" desc="No." />
                <Person nam="Victor" title="Quality Assurance and Backend" desc="The world shall burn." />
                <Person nam="Logan" title="Database Manager and Frontend" desc="I really do not like web development..." />
            </div>
        </div>
    )
}
export default AboutUs