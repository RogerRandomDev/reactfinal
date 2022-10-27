import React, {useState, useRef} from 'react'
import {FaFacebookF, FaTwitter} from 'react-icons/fa';
import {AiOutlineGoogle} from 'react-icons/ai';

function LandingPage() {
  const indicator = useRef(null);
  const userSelect = useRef(null);
  const businessSelect = useRef(null);
  const [username, setUsername] = useState("");
  const [password,setPassword]=useState("");
  
  return (
    <section className="flex h-screen">

        <div className="basis-[70%] text-center flex flex-col justify-center relative -z-50">
          <img src={require("../assets/testingsvg.PNG")} className="max-w-full object-cover w-9/12 mx-auto mb-4"alt="" />
          <h2 className='text-4xl font-semibold mb-4 text-blue-900'>Software Analytics and Marketing Statistics</h2>
          <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, est. Lorem, ipsum. <br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="landing__signup basis-[30%] bg-blue-900 flex flex-col items-center justify-between py-24 px-12 text-center text-neutral-100 cursor-pointer relative">

        <img src={require("../assets/Logo-Intel.png")} alt="" className="w-3/5" />
        {/* <Auth /> */}
          <form action="" className="flex flex-col items-center gap-4 w-full">
            <div className="flex w-3/4 relative isolate bg-slate-400 rounded-[1.5rem] mb-4">
              <div ref={userSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem]" onClick={()=>{indicator.current.style.transform="translateX(0%)"; businessSelect.current.classList.add("opacity-60"); userSelect.current.classList.remove("opacity-60");}}>User</div>
              <div ref={businessSelect}className="transition w-1/2 px-2 py-3 z-10 rounded-[1.5rem]" onClick={()=>{indicator.current.style.transform="translateX(100%)"; userSelect.current.classList.add("opacity-60"); businessSelect.current.classList.remove("opacity-60");}}>Business</div>
              <div ref={indicator} className="absolute transition duration-300 inset-y-0 w-1/2 left-0 bg-blue-500 z-0 rounded-[1.5rem]"></div>
            </div>
            {/* <h3 className='mb-6 text-neutral-100 text-lg font-light tracking-wide'>Sign Up</h3> */}
            <input placeholder='Username' type="text" value={username}  onChange={(e)=>setUsername(e.target.value)} name="username" className='py-2  px-4 rounded w-9/12 text-neutral-900'/>
            <input placeholder='Password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" className='py-2 rounded w-9/12 px-4  text-neutral-900'/>
            <button type="submit" className="btn-primary mt-4 w-9/12 py-2 rounded bg-blue-500 text-neutral-100 font-semibold">Sign Up</button>
          </form>
          <div className="alternate-signup">
            <h4>Or Sign Up With</h4>
            <div className="signup-cards">
              <div className="flex gap-4 justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaFacebookF className='text-blue-900'></FaFacebookF></div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><FaTwitter className='text-cyan-500'></FaTwitter></div>
               <div className="w-8 h-8 rounded-full bg-neutral-100 grid place-items-center cursor-pointer hover:-translate-y-1 transition"><AiOutlineGoogle className='text-red-500'></AiOutlineGoogle></div> 
              </div>
            </div>
          </div>
        <div className="signup__footer">
          <p>Already have an account? <span className='underline cursor-pointer hover:text-cyan-600 transition'>Sign In</span></p>
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