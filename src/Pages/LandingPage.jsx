import React, {useState, useRef, useReducer} from 'react'
import { useNavigate } from 'react-router-dom';
import {FaFacebookF, FaTwitter} from 'react-icons/fa';
import { useContext } from 'react';
import {AiOutlineGoogle} from 'react-icons/ai';
import {sendRequest} from '../Utils/requests';
import { storeLocal, getLocal } from '../hooks/useLocalStorageAuth';
import userContext from '../Context/userContext';
import { Link } from 'react-router-dom';
//https://coderthemes.com/ubold/layouts/default/index.html
const initialState = {username:"",email:"",password:"",confirmPassword:"",userType:"user",isSignUp:true, businessLogo:"",city:"",state:"",range:"Local",description:"",agreements:[false,false,false]};
function LandingPage({updateContext}) {
  const navigate = useNavigate();
   const context = useContext(userContext);
  
  const indicator = useRef(null);
  const userSelect = useRef(null);
  const businessSelect = useRef(null);
  const landingSignup = useRef(null);
  const mover = useRef(null);
  const hero = useRef(null);
  const section = useRef(null);
  const businessInfoSlider = useRef(null);

  const formInputReducer = (state,action)=>{
    if(action.type=="username"){
      return {...state, username:action.payload}
    }
    if(action.type=="email"){
      return {...state, email:action.payload}
    }
    if(action.type=="password"){
      return {...state, password:action.payload}
    }
    if(action.type=="confirmPassword"){
      return {...state, confirmPassword:action.payload}
    }
    if(action.type=="userType"){
      return {...state, userType:action.payload}
    }
    if(action.type=="changeToUserType"){
      indicator.current.style.transform="translateX(0%)"; 
      businessSelect.current.classList.add("opacity-60");
      userSelect.current.classList.remove("opacity-60"); 
        if(state.isSignUp){
      mover.current.classList.add("translate-x-[0%]");
      mover.current.classList.remove("-translate-x-[70%]");
        }
      return {...state, userType:"user"}
    }
    if(action.type=="changeToBusinessType"){
      indicator.current.style.transform="translateX(100%)";
      userSelect.current.classList.add("opacity-60"); 
      businessSelect.current.classList.remove("opacity-60");
        if(state.isSignUp){
      mover.current.classList.add("-translate-x-[70%]");
      mover.current.classList.remove("translate-x-[0%]");
      }
return {...state, userType:"business"}
    }
    if(action.type=="isSignUp"){
      return {...state, isSignUp:action.payload}
    }
    if(action.type=="changeSignUp"){
    if(!state.isSignUp && state.userType=="business"){
      mover.current.classList.add("-translate-x-[70%]");
    mover.current.classList.remove("translate-x-[0%]");
    }else{
mover.current.classList.remove("translate-x-[0%]");
    mover.current.classList.remove("-translate-x-[70%]");
    }
      return {...state, isSignUp:!state.isSignUp}
    }
    if(action.type=="businessLogo"){
      console.log(action)
      return {...state, businessLogo:action.payload}
    }
    if(action.type=="city"){
      return {...state, city:action.payload}
    }
    if(action.type=="state"){
      return {...state, state:action.payload}
    }
    if(action.type=="businessType"){
      return {...state, businessType:action.payload}
    }
    if(action.type=="range"){
      return {...state, range:action.payload}
    }
    if(action.type=="description"){
      return {...state, description:action.payload}
    }
    if(action.type=="agreements"){
      let agreements = state.agreements;
      // action.payload = [0,true]
      agreements[action.payload[0]] = action.payload[1];
      return {...state, agreements}
    }
    throw new Error("No Matching Action Type");
    
  }
  const [state, dispatch] = useReducer(formInputReducer, initialState);

 const handleSubmit = async (e) =>{
   e.preventDefault();
   console.log(state.userType=="business");
   if(state.userType=="business"){
     if(state.password === state.confirmPassword){
      console.log("front end req sent");
       let newUserData = await sendRequest("user/createAccount","POST",{
        header:{
    email:state.email,
    password:state.password,
    username:state.username,
    mycompany:state.userType=="user" ? "" : state.username,
    Location:[state.city,state.state],
    businessData:JSON.stringify({
      chosenAgreement:state.agreements,
      email:state.email,
      Name:state.username,
      BannerLink:null,
      Range:state.range,
      Location:[state.city,state.state],
      Description:state.description
    })
  },
  body:{
    Banner:state.businessLogo
  }

    // businessLogo,
    // city,
    // state,
    // type,
    // range,
    // description,
    // agreement1,
    // agreement2,
    // agreement3
   });
      }else{
      alert("passwords dont match");
    }
  }else{
    
    let data = await sendRequest("user/Login","GET",{
    header:{
      email:state.email,
      password:state.password
    }
   });
   data = JSON.parse(data);
   if(data.success == false) return;
   console.log(data._id);
   await storeLocal("token", data.token);

   let userData = await sendRequest("user/show","GET",{
    query:{
      "user":data._id
    }
   });
   userData = JSON.parse(userData);
   updateContext(userData);
   navigate("/profile");
  //  navigate(`/profile?user=${context._id}`);
  //  useNavigate(`/profile/${context._id}`)
   console.log(context._id);
  }
 }

 
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
          <input type="file" name="Image Upload" id="" onChange={async (e)=>{
            var fr=new FileReader();
            fr.onload=((f)=>{
              dispatch({type:"businessLogo",payload:f.target.result})
            })
            fr.readAsDataURL(e.target.files[0])
          }} />

          </div>
          <div className="general-information">
          <h2 className='text-3xl font-semibold mb-8'>General Information</h2>
          <div className="grid gap-8" style={{gridTemplateColumns:"1fr 1fr auto 1fr 1fr"}}>
            <div className='col-start-1 col-end-3'><label htmlFor="city" className='mb-4 block'>City</label><input className='py-2  px-4 rounded w-9/12 text-neutral-900' type="text" name="city" id="city"  value={state.city}  onChange={(e)=>dispatch({type:"city",payload:e.target.value})}/></div>
            <div className='col-start-4 col-end-6'><label htmlFor="state" className='mb-4 block'>State</label><input className='py-2  px-4 rounded w-9/12 text-neutral-900' type="text" name="state" id="state"  value={state.state} onChange={(e)=>dispatch({type:"state",payload:e.target.value})}/></div>
            <div className='col-start-2 col-end-5'><label htmlFor="range" className='mb-4 block'>Range</label><select className='py-2  px-4 rounded w-9/12 text-neutral-900' name="range" id="range" value={state.range} onChange={(e)=>dispatch({type:"range",payload:e.target.value})}>
  <option value="local">Local</option>
  <option value="regional">Regional</option>
  <option value="national">National</option>
  <option value="international">International</option>
</select></div>
          <div className="col-start-2 col-end-5 flex flex-col">
            <label htmlFor="business-description">Description</label>
          <textarea className='mt-4 py-2 px-4 rounded text-neutral-900' name="description" id="business-description" cols="30" rows="5" value={state.description} onChange={(e)=>dispatch({type:"description",payload:e.target.value})}></textarea>
          </div>
          </div>
</div>

          <div className="agreements">
          <h2 className='text-3xl font-semibold mb-8'>Agreements</h2>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex gap-4">
          <input type="checkbox" id="agreement1" name="agreement1" value={state.agreements[0]} onChange={(e)=>dispatch({type:"agreements",payload:[0,e.target.value]})}/>
<label htmlFor="agreement1">Business has atleast 10 unique products</label>
</div>
<div className="flex gap-4">
<input type="checkbox" id="agreement2" name="agreement2" value={state.agreements[1]} onChange={(e)=>dispatch({type:"agreements",payload:[1,e.target.value]})}/>
<label htmlFor="agreement2">Business has a stable supply of products</label>
</div>
<div className="flex gap-4">
<input type="checkbox" id="agreement3" name="agreement3" value={state.agreements[2]} onChange={(e)=>dispatch({type:"agreements",payload:[2,e.target.value]})}/>
<label htmlFor="agreement3">Business has their own website</label>
</div>
</div>
</div>


          </div>
          <img src={require("../assets/Logo-Intel.png")} alt="" className="w-3/5" />
          <form action="" className="flex flex-col items-center gap-4 w-full">
            <div className="flex w-3/4 relative isolate bg-slate-400 rounded-[1.5rem] mb-4 cursor-pointer">
              {/* modify these state functions for reducer */}
              <div ref={userSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem] font-bold " onClick={()=>dispatch({type:"changeToUserType"})}>Sign In</div>
              <div ref={businessSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem]  font-bold opacity-60" onClick={()=>dispatch({type:"changeToBusinessType"})}>Sign Up</div>
              <div ref={indicator} className="absolute transition duration-300 inset-y-0 w-1/2 left-0 bg-blue-500 z-0 rounded-[1.5rem]"></div>
            </div>
            {/* <h3 className='mb-6 text-neutral-100 text-lg font-light tracking-wide'>Sign Up</h3> */}
            <input placeholder='Email' type="text" value={state.email}  onChange={(e)=>dispatch({type:"email",payload:e.target.value})} name="email" className={`py-2  px-4 rounded w-9/12 text-neutral-900`}/>
            <input placeholder={"Username"} type="text" value={state.username}  onChange={(e)=>dispatch({type:"username",payload:e.target.value})} name="username" className={`py-2  px-4 rounded w-9/12 text-neutral-900 ${state.userType=="business" ? "block" : "hidden"}`}/>
            <input placeholder='Password' type="password" value={state.password} onChange={(e)=>dispatch({type:"password",payload:e.target.value})} name="password" className='py-2 rounded w-9/12 px-4  text-neutral-900'/>
            <input placeholder='Confirm Password' type="password" value={state.confirmPassword} onChange={(e)=>dispatch({type:"confirmPassword",payload:e.target.value})} name="confirmPassword" className={`py-2 rounded w-9/12 px-4 text-neutral-900 ${state.userType=="business" ? "block" : "hidden"}`}/>
            <input type="hidden" name="userType" value={state.userType} />
            
            <button type="submit" className='btn-primary mt-4 w-9/12 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold' onClick={(e)=>handleSubmit(e)}>Sign {state.userType=="business" ? "Up" : "In"}</button>
            
          </form>
          <div className="alternate-signup">
            <h4>Or Sign {state.userType=="business" ? "Up" : "In"} With</h4>
            <div className="signup-cards">
              <div className="flex gap-4 justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaFacebookF className='text-blue-900'></FaFacebookF></div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaTwitter className='text-cyan-500'></FaTwitter></div>
               <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><AiOutlineGoogle className='text-red-500'></AiOutlineGoogle></div> 
              </div>
            </div>
          </div>
        <div className="signup__footer">
          {/* <p>{state.isSignUp ? "Already Have an Account? " : "Create a New Account - "}<span onClick={()=>dispatch({type:"changeSignUp"})} className='underline cursor-pointer hover:text-cyan-600 transition'>Sign {state.isSignUp ? "In" : "Up"}</span></p> */}
        </div>
        </div>
        </div>
    </section>
  )
}

export default LandingPage