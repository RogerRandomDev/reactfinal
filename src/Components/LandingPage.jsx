import React, {useState, useRef} from 'react'
import {FaFacebookF, FaTwitter} from 'react-icons/fa';
import {AiOutlineGoogle} from 'react-icons/ai';
function LandingPage() {
  const indicator = useRef(null);
  const userSelect = useRef(null);
  const businessSelect = useRef(null);
  const landingSignup = useRef(null);
  const hero = useRef(null);
  const section = useRef(null);
  const businessInfoSlider = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleChangeSignUp = () =>{
    setIsSignUp(!isSignUp);
    if(isSignUp){
      section.current.classList.add("translate-x-[0%]");
    section.current.classList.remove("-translate-x-[70%]");
    } else if(!isSignUp && userType=="business"){
      section.current.classList.add("-translate-x-[70%]");
    section.current.classList.remove("translate-x-[0%]");
    }
    
  }

 const handleSubmit = (e) =>{
   e.preventDefault();
   if(isSignUp){
     if(password == confirmPassword){
      //  alert("succeed");
      }else{
      // alert("passwords dont match");
    }
    // if(userType == "business"){
    //   // section.current.classList.add("-translate-x-[70%]");
    // }
  }
 }
const handleChangeTypeToUser = () => {
  indicator.current.style.transform="translateX(0%)"; 
  businessSelect.current.classList.add("opacity-60");
  userSelect.current.classList.remove("opacity-60"); 
  setUserType("user"); 
  if(isSignUp){
  section.current.classList.add("translate-x-[0%]");
  section.current.classList.remove("-translate-x-[70%]");
  }
}
const handleChangeTypeToBusiness = () =>{
indicator.current.style.transform="translateX(100%)";
userSelect.current.classList.add("opacity-60"); 
businessSelect.current.classList.remove("opacity-60");
setUserType("business"); 
// businessInfoSlider.current
if(isSignUp){
section.current.classList.add("-translate-x-[70%]");
section.current.classList.remove("translate-x-[0%]");
}
}
/*
image upload for banner

*Website Link*

City and State

Active Range (local, regional, national, international)

Business Item Type (Variety, Food, Clothing)?

Business Description

checkboxes for business reqs (products? amount of users?)

*/
/*
TODO:
 * Add Business Details Section
 * Business Profile Page
 * Business Admin Page
 * User Profile Page
 * All Products Page for Users
 * Cart?
 * Checkout Page

*/
  return (
    <section ref={section} className="flex h-screen relative transition delay-200 duration-[600ms] ease-in-out overflow-hidden">
   <div ref={businessInfoSlider} className="absolute -right-[70%] h-screen w-[70%] bg-blue-900"></div>
        <div ref={hero} className="w-[70%] text-center flex flex-col justify-center">
          <img src={require("./testingsvg.PNG")} className="max-w-full object-cover w-9/12 mx-auto mb-4"alt="" />
          <h2 className='text-4xl font-semibold mb-4 text-blue-900'>Software Analytics and Marketing Statistics</h2>
          <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, est. Lorem, ipsum. <br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div ref={landingSignup} className="landing__signup w-[30%] bg-blue-900 flex flex-col items-center justify-between py-24 px-12 text-center text-neutral-100">
          <img src={require("./Logo-Intel.png")} alt="" className="w-3/5" />
          <form action="" className="flex flex-col items-center gap-4 w-full">
            <div className="flex w-3/4 relative isolate bg-slate-400 rounded-[1.5rem] mb-4 cursor-pointer">
              <div ref={userSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem] font-bold " onClick={()=>handleChangeTypeToUser()}>User</div>
              <div ref={businessSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem]  font-bold opacity-60" onClick={()=>handleChangeTypeToBusiness()}>Business</div>
              <div ref={indicator} className="absolute transition duration-300 inset-y-0 w-1/2 left-0 bg-blue-500 z-0 rounded-[1.5rem]"></div>
            </div>
            {/* <h3 className='mb-6 text-neutral-100 text-lg font-light tracking-wide'>Sign Up</h3> */}
            <input placeholder='Email' type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} name="email" className={`py-2  px-4 rounded w-9/12 text-neutral-900 ${isSignUp ? "block" : "hidden"}`}/>
            <input placeholder={userType =="user" ? 'Username' : "Business Name"} type="text" value={username}  onChange={(e)=>setUsername(e.target.value)} name="username" className='py-2  px-4 rounded w-9/12 text-neutral-900'/>
            <input placeholder='Password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" className='py-2 rounded w-9/12 px-4  text-neutral-900'/>
            <input placeholder='Confirm Password' type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name="confirmPassword" className={`py-2 rounded w-9/12 px-4 text-neutral-900 ${isSignUp ? "block" : "hidden"}`}/>
            <input type="hidden" name="userType" value={userType} />
            <button type="submit" className='btn-primary mt-4 w-9/12 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold' onClick={(e)=>handleSubmit(e)}>Sign {isSignUp ? "Up" : "In"}</button>
          </form>
          <div className="alternate-signup">
            <h4>Or Sign {isSignUp ? "Up" : "In"} With</h4>
            <div className="signup-cards">
              <div className="flex gap-4 justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaFacebookF className='text-blue-900'></FaFacebookF></div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaTwitter className='text-cyan-500'></FaTwitter></div>
               <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><AiOutlineGoogle className='text-red-500'></AiOutlineGoogle></div> 
              </div>
            </div>
          </div>
        <div className="signup__footer">
          <p>{isSignUp ? "Already Have an Account? " : "Create a New Account - "}<span onClick={()=>handleChangeSignUp()} className='underline cursor-pointer hover:text-cyan-600 transition'>Sign {isSignUp ? "In" : "Up"}</span></p>
        </div>
        </div>
    </section>
  )
}

export default LandingPage