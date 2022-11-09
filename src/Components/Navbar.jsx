import { GoThreeBars } from "react-icons/go"
import { IoMdArrowDropdown } from "react-icons/io"
import { BsPerson, BsGearFill } from "react-icons/bs"
import { AiOutlineUnlock, AiFillCalendar, AiFillWallet } from "react-icons/ai"
import { FaWrench, FaThList, FaList } from "react-icons/fa"
import { useState } from "react"
export default function Navbar({ AccountName }) {
    let [navHidden, setNavHidden] = useState(true)
    let [sideHidden, setSideHidden] = useState(true)
    return <div className="bg-gray-700 flex items-center p-5 z-80 justify-between w-full fixed top-0">
        <div className="float-left flex align-middle h-full flex-1">
            <a className="h-full w-20 grid mr-2" href="/login">
                <img src="https://picsum.photos/40/40" className="inline-block place-self-center" />
            </a>
            <div className={`text-white absolute md:hidden flex justify-start flex-col gap-y-7 py-3 p-2 pr-6 pb-4 "w-3/4" transition-transform bg-gray-700 translate-y-[3.75rem] ${sideHidden && "translate-x-[-1.3rem]" || "translate-x-[-15rem]"} z-20`}>
                <a href="/profile" className="w-full ml-2 text-2xl">
                    <BsPerson className="inline-block m-auto mr-1 mb-1" />
                    My Account
                </a>
                <a href="/home" className="w-full ml-2 text-2xl">
                    <BsGearFill className="inline-block m-auto mr-1 mb-1" />
                    Settings
                </a>
                <a className="w-full ml-2 text-2xl" href="/DIE" >
                    <AiOutlineUnlock className="inline-block m-auto mr-1 mb-1" />
                    Log Out
                </a>
                <div className="h-px bg-blue-400 w-full"></div>
                <a href="/test" className="text-left ml-2 text-2xl bg-none hover:text-gray-200 transition-colors">
                    <AiFillCalendar className="inline-block mr-1 mb-1" />
                    Dashboard
                </a>
                <a href="/test2" className="text-left ml-2 text-2xl bg-none hover:text-gray-200 transition-colors">
                    <AiFillWallet className="inline-block mr-1 mb-1" />
                    All Products
                </a>
                <a href="/test3" className="text-left ml-2 text-lg bg-none hover:text-gray-200 transition-colors">
                    <FaWrench className="inline-block mr-1 mb-1" />
                    Add/Edit Products
                </a>
                <a href="/productdetail" className="text-left ml-2 text-2xl bg-none hover:text-gray-200 transition-colors">
                    <FaList className="inline-block mr-2 mb-1" />
                    Customer List
                </a>
            </div>
        </div>
        <div className="h-full m-0 md:m-auto justify-self-start md:justify-self-center flex-5">
            <button className="w-9 sm:block md:hidden mr-3" onClick={() => { setSideHidden(!sideHidden) }}>
                <GoThreeBars className="w-full h-full m-auto text-white" />
            </button>
            <a href="/test" className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Dashboard</a>
            <a href="/test2" className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">All Products</a>
            <a href="/test3" className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Add/Edit Products</a>
            <a href="/productdetail" className="hidden md:inline-block bg-none text-gray-300 hover:text-gray-200 transition-colors">Customer List</a>
        </div>
        {/* dashboard, all products, add/edit product, customer list */}
        {/* profile button with My account, settings, and logout */}
        {/* profile thing on right hidden on mobile and put on three dots instead */}
        <li className="hidden md:inline-block h-full ml-auto md:ml-0 list-none flex-1">
            <button className="text-white block w-max ml-auto pl-4 mr-3 z-30 hover:cursor-pointer" onClick={() => { setNavHidden(!navHidden) }}>
                <img src="https://picsum.photos/40/40" className="inline-block place-self-center rounded-full mr-2" />
                <p className="inline-block mr-1">{AccountName || "LOSERMODE"}</p>
                <IoMdArrowDropdown className={`inline-block ${navHidden && "rotate-180"} transition-transform`} />
                <div className={`z-20 absolute bg-gray-700 w-40 ${navHidden && "h-0 p-0" || "h-[11.5rem]"} transition-all rounded-b translate-y-5 overflow-hidden flex flex-col gap-y-1 items-center`}>
                    <div className="w-full">
                        <p className="text-center px-4 mb-1 mt-2 w-full transition">RAVAGE</p>
                    </div>
                    <div className="hover:bg-slate-400 w-full py-2 transition">
                        <a href="/profile" className="text-center px-4 w-full">
                            <BsPerson className="inline-block m-auto mr-1" />
                            My Account
                        </a>
                    </div>
                    <div className="hover:bg-slate-400 w-full py-2 transition">
                        <a href="/home" className="text-center px-4 w-full">
                            <BsGearFill className="inline-block m-auto mr-1" />
                            Settings
                        </a>
                    </div>
                    <div className="px-4 h-px bg-blue-400 w-full"></div>
                    <div className="hover:bg-slate-400 w-full transition py-2">
                        <a className="px-4 w-full" href="/DIE" >
                            <AiOutlineUnlock className="inline-block m-auto mr-1" />
                            Log Out
                        </a>
                    </div>
                </div>

            </button>
        </li>
    </div>
}