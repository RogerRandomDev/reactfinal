function AboutUs() {
    return (
        <>
            <div>
                <h1 className="text-5xl mx-auto mb-5 mt-6 text-center"><b>About Us</b></h1>
                <img src="https://picsum.photos/501/300" alt="the team" className="mx-auto mb-3"></img>
                <p className="mb-5 mx-auto text-center w-4/12">We are a group of 4 people who moderately dislike big chungus. We also like e-commerce apps for free money.</p>
            </div>
            <div className="grid grid-cols-2 w-9/12 mx-auto justify-center text-center mb-5 mt-5 gap-x-7">
                <div>
                    <h1 className="text-4xl mx-auto"><b>Roger</b></h1>
                    <h2 className="mx-auto mb-3 text-slate-500"><i>Team Manager and Backend</i></h2>
                    <img src="https://picsum.photos/502/300" alt="roger" className="mx-auto mb-3"></img>
                    <p className="mb-5 mx-auto">Roger is the incarnation of human suffering and spite born soley to bask in the pain of others.</p>
                </div>
                <div>
                    <h1 className="text-4xl mx-auto"><b>Trent</b></h1>
                    <h2 className="mx-auto mb-3 text-slate-500"><i>Frontend</i></h2>
                    <img src="https://picsum.photos/503/300" alt="trent" className="mx-auto mb-3"></img>
                    <p className="mb-5">No.</p>
                </div>
                <div>
                    <h1 className="text-4xl mx-auto"><b>Victor</b></h1>
                    <h2 className="mx-auto mb-3 text-slate-500"><i>Quality Assurance and Backend</i></h2>
                    <img src="https://picsum.photos/504/300" alt="victor" className="mx-auto mb-3"></img>
                    <p className="mb-5 mx-auto">The world shall burn.</p>
                </div>
                <div>
                    <h1 className="text-4xl mx-auto"><b>Logan</b></h1>
                    <h2 className="mx-auto mb-3 text-slate-500"><i>Database Manager and Frontend</i></h2>
                    <img src="https://picsum.photos/505/300" alt="logan" className="mx-auto mb-3"></img>
                    <p className="mb-5 mx-auto">I really do not like web development...</p>
                </div>
            </div>
        </>
    )
}
export default AboutUs