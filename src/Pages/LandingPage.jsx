import React, { useRef, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
import { sendRequest } from '../Utils/requests';
import { storeLocal } from '../Utils/useLocalStorageAuth';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
// import { userContext } from '../Context/userContext';
import { ReactComponent as Desktopsvg } from '../assets/item.svg';
// import {userContext} from '../Context/userContext';
// import { Link } from 'react-router-dom';
//https://coderthemes.com/ubold/layouts/default/index.html
const initialState = { username: "", email: "", password: "", confirmPassword: "", userType: "user", isSignUp: true, businessLogo: "", description: "" };
function LandingPage({ updateContext }) {
  const navigate = useNavigate();
  // const context = useContext(userContext);

  const indicator = useRef(null);
  const userSelect = useRef(null);
  const businessSelect = useRef(null);
  const landingSignup = useRef(null);
  const mover = useRef(null);
  const hero = useRef(null);
  const section = useRef(null);
  const businessInfoSlider = useRef(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const formInputReducer = (state, action) => {
    if (action.type === "changeToUserType") {
      indicator.current.style.transform = "translateX(0%)";
      businessSelect.current.classList.add("opacity-60");
      userSelect.current.classList.remove("opacity-60");

      if (state.isSignUp) {
        hero.current.classList.remove("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        hero.current.classList.add("md:translate-x-[0%]")
        landingSignup.current.classList.remove("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        landingSignup.current.classList.add("md:translate-x-[0%]")
        businessInfoSlider.current.classList.remove("md:-translate-x-[100%]")
        businessInfoSlider.current.classList.add("md:translate-x-[0%]")
        mover.current.classList.add("overflow-y-hidden")
        if (mover.current.getBoundingClientRect().width < 800) {
          hero.current.scrollIntoView({ behavior: "smooth" })
        };
      }
      return { ...state, userType: "user" }
    }
    if (action.type === "changeToBusinessType") {
      indicator.current.style.transform = "translateX(100%)";
      userSelect.current.classList.add("opacity-60");
      businessSelect.current.classList.remove("opacity-60");

      // businessInfoSlider.current.scrollIntoView({ behavior: "smooth" });
      // console.log(mover.current.getBoundingClientRect().width < 800);
      if (mover.current.getBoundingClientRect().width < 800) {
        businessInfoSlider.current.scrollIntoView({ behavior: "smooth" })
      };
      if (state.isSignUp) {
        hero.current.classList.add("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        hero.current.classList.remove("md:translate-x-[0%]")
        landingSignup.current.classList.add("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        landingSignup.current.classList.remove("md:translate-x-[0%]")
        businessInfoSlider.current.classList.add("md:-translate-x-[100%]")
        businessInfoSlider.current.classList.remove("md:translate-x-[0%]")
        mover.current.classList.remove("overflow-y-hidden")
      }
      return { ...state, userType: "business" }
    }
    if (action.type === "changeSignUp") {
      if (!state.isSignUp && state.userType === "business") {
        hero.current.classList.add("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        hero.current.classList.remove("md:translate-x-[0%]")

        landingSignup.current.classList.add("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        landingSignup.current.classList.remove("md:translate-x-[0%]")

        businessInfoSlider.current.classList.add("md:-translate-x-[100%]")
        businessInfoSlider.current.classList.remove("md:translate-x-[0%]")

        hero.current.scrollIntoView({ behavior: "smooth" })

        mover.current.classList.remove("overflow-y-hidden")
      } else {
        hero.current.classList.remove("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        hero.current.classList.remove("md:translate-x-[0%]")

        landingSignup.current.classList.remove("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        landingSignup.current.classList.remove("md:translate-x-[0%]")

        businessInfoSlider.current.classList.remove("md:-translate-x-[100%]", "lg:-translate-x-[233.3%]")
        businessInfoSlider.current.classList.remove("md:translate-x-[0%]")

        hero.current.scrollIntoView({ behavior: "smooth" })

        mover.current.classList.add("overflow-y-hidden")
      }
      return { ...state, isSignUp: !state.isSignUp }
    }

    if (action.type === "businessLogo") {
      // console.log(action)
      return { ...state, businessLogo: action.payload }
    }
    // if (action.type && action.payload) {
    return { ...state, [action.type]: action.payload }
    // }
    // throw new Error("No Matching Action Type");

  }
  const [state, dispatch] = useReducer(formInputReducer, initialState);

  const verifyInputs = () => {
    return Object.keys(state).every(item => {
      return state[item];
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.userType === "business") {
      if (!verifyInputs()) {
        swal({
          title: `Account Sign Up Failed`,
          text: "Please Ensure all Fields are Completed",
          icon: "error",
          button: "Okay"
        })
        return;
      }
      if (state.password === state.confirmPassword) {
        // console.log("front end req sent");
        swal({
          title: `Email Confirmation Sent to ${state.email}`,
          text: "Please Sign in after Account Confirmation",
          icon: "success",
          button: "Cool!"
        })
        let newUserData = await sendRequest("user/createAccount", "POST", {
          body: {
            email: state.email,
            password: state.password,
            username: state.username,
            mycompany: state.userType === "user" ? "" : state.username,
            Location: [state.city, " " + state.state],
            Banner: state.businessLogo,
            businessData: JSON.stringify({
              chosenAgreement: state.agreements,
              email: state.email,
              Name: state.username,
              BannerLink: null,
              Range: state.range,
              Location: [state.city, state.state],
              Description: state.description,
            })
          }
        });
        // console.log(newUserData);
      } else {
        alert("passwords dont match");
      }
    } else {
      // console.log("Sending Login from frontend");
      setLoggingIn(true);
      // console.log(state.email, state.password);
      let data = await sendRequest("user/Login", "POST", {
        body: {
          email: state.email,
          password: state.password
        }
      });
      // console.log(data, "144");
      data = JSON.parse(data);
      if (data.success === false) {
        setLoggingIn(false);
        swal({
          title: `Incorrect Login Information`,
          text: "Please Ensure Email and Password are Correct",
          icon: "error",
          button: "Okay"
        })
        return;
      };
      localStorage.clear();
      // console.log(data._id);
      await storeLocal("token", data.token);

      let userData = await sendRequest("user/show", "POST", {
        body: {
          "user": data._id
        }
      });
      // send to localstorage
      storeLocal("user", userData);
      setLoggingIn(false);
      dispatch({ type: "REFRESH_DATA", payload: userData });
      navigate("/profile");
    }
  }

  return (
    <section ref={section} className="">
      <div ref={mover} className="overflow-y-hidden md:overflow-x-hidden md:grid h-screen md:grid-cols-[50%_50%_50%] lg:md:grid-cols-[70%_30%_70%] -mt-14 relative delay-200 duration-[600ms] ease-in-out md:translate-x-[0%]">

        <div ref={hero} className="h-full pt-6 transition duration-300 hidden p-1 w-full text-center md:flex flex-col justify-center md:mt-0 md:mb-0 ">
          <img src={require("../assets/testingsvg.PNG")} className="object-cover mx-auto w-3/4" alt="" />
          <h2 className='text-4xl font-semibold mb-4 text-blue-900 w-[90%] mx-auto'>Software Analytics and Marketing Statistics</h2>
          <p className='text-slate-400 mb-5 md:mb-0 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, est. Lorem, ipsum. <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <div ref={landingSignup} className="transition duration-300 overflow-hidden relative border landing__signup w-full bg-blue-900 block md:flex flex-col items-center justify- place-content-center pb-12 pt-36 md:pt-12 px-10 h-full text-center text-neutral-100 border-blue-900">
          {/* <img src={require("../assets/Logo-Intel.png")} alt="" className="w-3/5 inline-block mb-5 md:mb-0" /> */}
          <Desktopsvg className="w-3/5 inline-block mb-5 md:mb-0" />
          <form action="" className="flex flex-col items-center gap-4 w-full">
            <div className="flex w-3/4 relative isolate bg-slate-400 rounded-[1.5rem] mb-4 cursor-pointer">
              {/* modify these state functions for reducer */}
              <div ref={userSelect} className="block my-auto transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem] font-bold " onClick={() => dispatch({ type: "changeToUserType" })}>Sign In</div>
              <div ref={businessSelect} className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem] font-bold opacity-60" onClick={() => dispatch({ type: "changeToBusinessType" })}>Sign Up</div>
              <div ref={indicator} className="absolute transition duration-300 inset-y-0 w-1/2 left-0 bg-blue-500 z-0 rounded-[1.5rem]"></div>
            </div>
            {/* <h3 className='mb-6 text-neutral-100 text-lg font-light tracking-wide'>Sign Up</h3> */}
            <input placeholder='Email' type="text" value={state.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value })} name="email" className={`py-2  px-4 rounded w-9/12 text-neutral-900`} />
            <input placeholder={"Username"} type="text" value={state.username} onChange={(e) => dispatch({ type: "username", payload: e.target.value })} name="username" className={`py-2  px-4 rounded w-9/12 text-neutral-900 ${state.userType === "business" ? "block" : "hidden"}`} />
            <input placeholder='Password' type="password" value={state.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value })} name="password" className='py-2 rounded w-9/12 px-4  text-neutral-900' />
            <input placeholder='Confirm Password' type="password" value={state.confirmPassword} onChange={(e) => dispatch({ type: "confirmPassword", payload: e.target.value })} name="confirmPassword" className={`py-2 rounded w-9/12 px-4 text-neutral-900 ${state.userType === "business" ? "block" : "hidden"}`} />
            <input type="hidden" name="userType" value={state.userType} />
            {!loggingIn
              ?
              <button type="submit" className='btn-primary mt-4 w-9/12 mb-5 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold'
                onClick={(e) => handleSubmit(e)}>
                Sign {state.userType === "business" ? "Up" : "In"}
              </button>
              :
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#fff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            }



          </form>
          {/* <div className="alternate-signup mb-5">
            <h4>Or Sign {state.userType === "business" ? "Up" : "In"} With</h4>
            <div className="signup-cards">
              <div className="flex gap-4 justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaFacebookF className='text-blue-900'></FaFacebookF></div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaTwitter className='text-cyan-500'></FaTwitter></div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><AiOutlineGoogle className='text-red-500'></AiOutlineGoogle></div>
              </div>
            </div>
          </div> */}
          <div className="signup__footer">
            {/* <p>{state.isSignUp ? "Already Have an Account? " : "Create a New Account - "}<span onClick={()=>dispatch({type:"changeSignUp"})} className='underline cursor-pointer hover:text-cyan-600 transition'>Sign {state.isSignUp ? "In" : "Up"}</span></p> */}
          </div>
        </div>
        <div ref={businessInfoSlider} className="transition duration-300 text-white mt-0 pb-9 md:pb-0 h-auto w-full bg-blue-900 flex flex-col items-center justify-center gap-5">

          <div className="business-logo flex flex-col items-center justify-center w-full pb-5">
            <h2 className='text-3xl font-semibold mb-8'>Business Logo</h2>
            <input className="block mx-auto text-center w-full md:w-auto" type="file" name="Image Upload" id="" onChange={async (e) => {
              var fr = new FileReader();
              fr.onload = ((f) => {
                dispatch({ type: "businessLogo", payload: f.target.result })
              })
              fr.readAsDataURL(e.target.files[0])
            }} />

          </div>
          <div className="general-information w-full h-auto">
            <h2 className='text-3xl font-semibold mb-8 text-center'>General Information</h2>
            <label htmlFor="business-description" className="block text-center">Description</label>
            <textarea className='block mt-4 py-2 px-4 rounded text-neutral-900 mx-auto w-[90%] md:w-[60%]' name="description" id="business-description" cols="30" rows="5" value={state.description} onChange={(e) => dispatch({ type: "description", payload: e.target.value })}></textarea>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage