import { IoMdArrowDropdown } from "react-icons/io"
import { BsPerson, BsGearFill } from "react-icons/bs"
import { AiOutlineUnlock, AiFillCalendar, AiFillWallet } from "react-icons/ai"
import { FaWrench, FaList } from "react-icons/fa"
import { useState, useContext } from "react"
import { userContext } from "../Context/userContext"
import { ReactComponent as Desktopsvg } from '../assets/item.svg';
import { ReactComponent as Mobilesvg } from '../assets/halfnote.svg';
import { useNavigate } from "react-router"
import { getLocal } from "../Utils/useLocalStorageAuth"
import { Link } from "react-router-dom"
export default function Navbar() {
    let [navHidden, setNavHidden] = useState(true);
    let [sideHidden, setSideHidden] = useState(true);
    const { state } = useContext(userContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    return <div className="bg-gray-700 flex items-center px-5 py-2 z-50 justify-between w-full fixed top-0 left-0 right-0">
        <div className="float-left flex align-middle h-full flex-1 md:flex-5">
            <Link className="w-14 md:w-24 grid mr-2 h-full" to="/products">
                <Desktopsvg className="hidden md:inline-block" />
                <Mobilesvg className="inline-block md:hidden" />
            </Link>
            {/* NEED THIS TO WORK */}
            {/* {!sideHidden && <div className="absolute md:hidden flex justify-start flex-col gap-y-3 p-2 w-3/4 h-3/4 bg-white translate-y-[3.75rem] translate-x-[-1.3rem] z-20"> */}
            <div className={`text-white absolute md:hidden flex justify-start flex-col gap-y-3 bg-gray-700 translate-y-16 ${sideHidden ? "translate-x-[-15.3rem]" : "translate-x-[-1.3rem]"} z-20`} style={{ transition: "transform 0.6s cubic-bezier(0.75, 0, 0.25, 1)" }}>

                <Link to="/profile" className="w-full text-2xl hover:bg-slate-400 p-6 transition">
                    <BsPerson className="inline-block m-auto mr-1 mb-1" />
                    My Account
                </Link>
                <Link to="/home" className="w-full hover:bg-slate-400 text-2xl p-6 transition">
                    <BsGearFill className="inline-block m-auto mr-1 mb-1" />
                    Settings
                </Link>
                <Link className="w-full hover:bg-slate-400 text-2xl p-6 transition" to="/DIE" >
                    <AiOutlineUnlock className="inline-block m-auto mr-1 mb-1" />
                    Log Out
                </Link>
                <div className="h-px bg-blue-400 w-full"></div>
                <Link to="/products" className="text-left hover:bg-slate-400 text-2xl bg-none hover:text-gray-200 transition p-6">
                    <AiFillWallet className="inline-block mr-1 mb-1" />
                    All Products
                </Link>
                <Link to="/addEdit" className="text-left hover:bg-slate-400 text-2xl bg-none hover:text-gray-200 transition p-6">
                    <FaWrench className="inline-block mr-1 mb-1" />
                    Add Products
                </Link>
                <Link to="/about" className="text-left hover:bg-slate-400 text-2xl bg-none hover:text-gray-200 transition p-6">
                    <AiFillCalendar className="inline-block mr-1 mb-1" />
                    About Us
                </Link>
                {/* <Link to="/productdetail" className="text-left hover:bg-slate-400 text-2xl bg-none hover:text-gray-200 transition p-6">
                    <FaList className="inline-block mr-2 mb-1" />
                    Customer List
                </Link> */}
            </div>
        </div>
        <div className="h-full m-0 md:m-auto justify-self-center flex-2">
            <button className="w-12 inline-block md:hidden mr-3 float-right" onClick={() => { setSideHidden(!sideHidden) }}>
                <div className="">
                    <div className={`transition duration-500 w-full bg-white rounded-lg h-1 mb-1 ${!sideHidden && "rotate-45  translate-y-2"}`}></div>
                    <div className={`transition duration-500 w-full bg-white rounded-lg h-1 mb-1 ${!sideHidden && "opacity-0"}`}></div>
                    <div className={`transition duration-500 w-full bg-white rounded-lg h-1 ${!sideHidden && "-rotate-45  -translate-y-2"}`}></div>
                </div>
                {/* <GoThreeBars className="w-full h-full m-auto text-white" /> */}
            </button>
            <Link to="/products" className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">All Products</Link>
            <Link to="/addEdit" className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Add Products</Link>
            <Link to="/about" className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">About Us</Link>
            {/* <Link to="/productdetail" className="hidden md:inline-block bg-none text-gray-300 hover:text-gray-200 transition-colors">Customer List</Link> */}
        </div>
        {/* dashboard, all products, add/edit product, customer list */}
        {/* profile button with My account, settings, and logout */}
        {/* profile thing on right hidden on mobile and put on three dots instead */}
        <ol className="relative hidden md:inline-block h-full ml-auto md:ml-0 list-none flex-1 md:flex-5">
            {
                getLocal("user") ?
                    <button className="text-white block w-max ml-auto pl-4 mr-3 z-30" onClick={() => { setNavHidden(!navHidden) }}>
                        <img src={"https://res.cloudinary.com/dztnsrrta/image/upload/" + state.user.icon} alt="Profile" className="w-10 h-10 inline-block place-self-center rounded-full mr-2" />
                        <p className="inline-block mr-1">
                            {state?.user?.username?.split(" ")[0] || "Guest"}
                        </p>
                        <IoMdArrowDropdown className={`inline-block ${navHidden && "rotate-180"} transition-transform duration-[600ms]`} />
                        <div className={`z-20 absolute top-[1.75rem] -right-5 bg-gray-700 w-40 ${navHidden ? "h-0 p-0" : "h-[8.5rem]"} rounded-b translate-y-5 overflow-hidden flex flex-col gap-y-1 items-center -bottom-50`} style={{ transition: "all 0.6s cubic-bezier(0.75, 0, 0.25, 1)" }}>

                            <Link to="/profile" className="hover:bg-slate-400 w-full py-2 transition">
                                <div className="text-center px-4 w-full">
                                    <BsPerson className="inline-block m-auto mr-1" />
                                    My Account
                                </div>
                            </Link>
                            <Link to="/home" className="hover:bg-slate-400 w-full py-2 transition">
                                <div className="text-center px-4 w-full">
                                    <BsGearFill className="inline-block m-auto mr-1" />
                                    Settings
                                </div>
                            </Link>
                            <Link to="/login" className="hover:bg-slate-400 w-full transition py-2">
                                <div className="px-4 w-full" onClick={() => handleLogOut()} >
                                    <AiOutlineUnlock className="inline-block m-auto mr-1" />
                                    Log Out
                                </div>
                            </Link>
                        </div>

                    </button>
                    :
                    <Link to="/login" className="text-gray-300 block w-max ml-auto pl-4 mr-3 z-30 hover:underline">Login / Sign Up</Link>
            }
        </ol>
    </div>
}