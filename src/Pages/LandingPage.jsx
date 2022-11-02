import React, {useState, useRef} from 'react'
import {FaFacebookF, FaTwitter} from 'react-icons/fa';
import {AiOutlineGoogle} from 'react-icons/ai';
import {sendRequest} from '../Utils/requests';
import { storeLocal, getLocal } from '../hooks/useLocalStorageAuth';
//https://coderthemes.com/ubold/layouts/default/index.html
function LandingPage() {
  const indicator = useRef(null);
  const userSelect = useRef(null);
  const businessSelect = useRef(null);
  const landingSignup = useRef(null);
  const mover = useRef(null);
  const hero = useRef(null);
  const section = useRef(null);
  const businessInfoSlider = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [isSignUp, setIsSignUp] = useState(true);
  const [businessLogo, setBusinessLogo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [range, setRange] = useState("");
  const [description, setDescription] = useState("");
  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);
  const [agreement3, setAgreement3] = useState(false);

  const handleChangeSignUp = () =>{
    setIsSignUp(!isSignUp);
    if(!isSignUp && userType=="business"){
      mover.current.classList.add("-translate-x-[70%]");
    mover.current.classList.remove("translate-x-[0%]");
    }else{
mover.current.classList.remove("translate-x-[0%]");
    mover.current.classList.remove("-translate-x-[70%]");
    }
    
  }

 const handleSubmit = async (e) =>{
   e.preventDefault();
   console.log(isSignUp);
   if(isSignUp){
     if(password === confirmPassword){
      console.log("front end req sent");
       await sendRequest("user/createAccount","POST",{
    email,
    password,
    username,
    mycompany:userType=="user" ? "" : username,  
    // businessLogo,
    // city,
    // state,
    // type,
    // range,
    // description,
    // agreement1,
    // agreement2,
    // agreement3
   })
      }else{
      alert("passwords dont match");
    }
  }else{
    let data = await sendRequest("user/Login","GET",{
    email:email,
    password:password
   });
   await storeLocal("token", JSON.parse(data).token);
  }
 }
const handleChangeTypeToUser = () => {
  indicator.current.style.transform="translateX(0%)"; 
  businessSelect.current.classList.add("opacity-60");
  userSelect.current.classList.remove("opacity-60"); 
  setUserType("user"); 
  if(isSignUp){
    mover.current.classList.add("translate-x-[0%]");
    mover.current.classList.remove("-translate-x-[70%]");
  //   businessInfoSlider.current.classList.add("-right-[70%]");
  // businessInfoSlider.current.classList.remove("right-[0%]");
  }
}
const handleChangeTypeToBusiness = () =>{
indicator.current.style.transform="translateX(100%)";
userSelect.current.classList.add("opacity-60"); 
businessSelect.current.classList.remove("opacity-60");
setUserType("business"); 
if(isSignUp){
  mover.current.classList.add("-translate-x-[70%]");
  mover.current.classList.remove("translate-x-[0%]");
  // businessInfoSlider.current.classList.remove("-right-[70%]");
  // businessInfoSlider.current.classList.add("right-[0%]");
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
  return (
    <section ref={section} className="overflow-hidden">
      <div className="flex h-screen relative transition delay-200 duration-[600ms] ease-in-out" ref={mover}>
   
        <div ref={hero} className="w-[70%] text-center flex flex-col justify-center">
          <img src={require("../assets/testingsvg.PNG")} className="max-w-full object-cover w-9/12 mx-auto mb-4"alt="" />
          <h2 className='text-4xl font-semibold mb-4 text-blue-900'>Software Analytics and Marketing Statistics</h2>
          <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, est. Lorem, ipsum. <br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div ref={landingSignup} className="relative landing__signup w-[30%] bg-blue-900 flex flex-col items-center justify-between py-24 px-12 text-center text-neutral-100 border-r border-blue-900">
          <div ref={businessInfoSlider} className="absolute top-0 left-full h-screen w-[70vw] bg-blue-900 flex flex-col items-center justify-center gap-10">

          <div className="business-logo flex flex-col items-center justify-center">
          <h2 className='text-3xl font-semibold mb-8'>Business Logo</h2>
          <input type="file" name="Image Upload" id="" value={businessLogo} onChange={(e)=>setBusinessLogo(e.target.value)} />
          </div>

          <div className="general-information">
          <h2 className='text-3xl font-semibold mb-8'>General Information</h2>
          <div className="grid gap-8" style={{gridTemplateColumns:"1fr 1fr auto 1fr 1fr"}}>
            <div className='col-start-1 col-end-3'><label htmlFor="city" className='mb-4 block'>City</label><input className='py-2  px-4 rounded w-9/12 text-neutral-900' type="text" name="city" id="city"  value={city}  onChange={(e)=>setCity(e.target.value)}/></div>
            <div className='col-start-4 col-end-6'><label htmlFor="state" className='mb-4 block'>State</label><input className='py-2  px-4 rounded w-9/12 text-neutral-900' type="text" name="state" id="state"  value={state} onChange={(e)=>setState(e.target.value)}/></div>
            <div className='col-start-1 col-end-3'><label htmlFor="type" className='mb-4 block'>Type</label><input className='py-2  px-4 rounded w-9/12 text-neutral-900' type="text" name="type" id="type"  value={type} onChange={(e)=>setType(e.target.value)}/></div>
            <div className='col-start-4 col-end-6'><label htmlFor="range" className='mb-4 block'>Range</label><select className='py-2  px-4 rounded w-9/12 text-neutral-900' name="range" id="range" value={range} onChange={(e)=>setRange(e.target.value)}>
  <option value="local">Local</option>
  <option value="regional">Regional</option>
  <option value="national">National</option>
  <option value="international">International</option>
</select></div>
          <div className="col-start-2 col-end-5 flex flex-col">
            <label htmlFor="business-description">Description</label>
          <textarea className='mt-4 py-2 px-4 rounded text-neutral-900' name="description" id="business-description" cols="30" rows="5"></textarea>
          </div>
          </div>
</div>

          <div className="agreements">
          <h2 className='text-3xl font-semibold mb-8'>Agreements</h2>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex gap-4">
          <input type="checkbox" id="agreement1" name="agreement1" value={agreement1} onChange={(e)=>setAgreement1(e.target.value)}/>
<label htmlFor="agreement1">Business has atleast 10 unique products</label>
</div>
<div className="flex gap-4">
<input type="checkbox" id="agreement2" name="agreement2" value={agreement2} onChange={(e)=>setAgreement2(e.target.value)}/>
<label htmlFor="agreement2">Business has a stable supply of products</label>
</div>
<div className="flex gap-4">
<input type="checkbox" id="agreement3" name="agreement3" value={agreement3} onChange={(e)=>setAgreement3(e.target.value)}/>
<label htmlFor="agreement3">Business has their own website</label>
</div>
</div>
</div>


          </div>
          <img src={require("../assets/Logo-Intel.png")} alt="" className="w-3/5" />
          <form action="" className="flex flex-col items-center gap-4 w-full">
            <div className="flex w-3/4 relative isolate bg-slate-400 rounded-[1.5rem] mb-4 cursor-pointer">
              <div ref={userSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem] font-bold " onClick={()=>handleChangeTypeToUser()}>User</div>
              <div ref={businessSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem]  font-bold opacity-60" onClick={()=>handleChangeTypeToBusiness()}>Business</div>
              <div ref={indicator} className="absolute transition duration-300 inset-y-0 w-1/2 left-0 bg-blue-500 z-0 rounded-[1.5rem]"></div>
            </div>
            {/* <h3 className='mb-6 text-neutral-100 text-lg font-light tracking-wide'>Sign Up</h3> */}
            <input placeholder='Email' type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} name="email" className={`py-2  px-4 rounded w-9/12 text-neutral-900 ${isSignUp ? "block" : "hidden"}`}/>
            <input placeholder={userType ==="user" ? 'Username' : "Business Name"} type="text" value={username}  onChange={(e)=>setUsername(e.target.value)} name="username" className='py-2  px-4 rounded w-9/12 text-neutral-900'/>
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
        </div>
    </section>
  )
//Please find a way to use this Trent it has email validation and also has pasword checking
  /* const myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        const { name, value } = event.target;
        switch (name) {

            case 'email':
                if (value.length === 0) {
                    errors.email =
                        value.length < 5
                            ? 'Email is Required!'
                            : '';
                    break;
                }
                if (value.length > 0) {
                    errors.email =
                        validEmailRegex.test(value)
                            ? ''
                            : 'Email is not valid!';
                    break;
                }
                break;
            case 'password':
                if (value.length > 0) {
                    errors.password =
                        value.length < 6
                            ? 'Password must be 6 characters long!'
                            : '';
                }

                if (value.length === 0) {
                    errors.password =
                        value.length === 0
                            ? 'Password is required!'
                            : '';
                }
                break;
            default:
                break;
        }

        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {
        });
    }
    */
}

export default LandingPage