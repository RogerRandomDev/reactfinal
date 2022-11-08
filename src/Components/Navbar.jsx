import { GoThreeBars } from "react-icons/go"
import { IoMdArrowDropdown } from "react-icons/io"
import { BsPerson, BsGearFill } from "react-icons/bs"
import { AiOutlineUnlock, AiFillCalendar, AiFillWallet } from "react-icons/ai"
import { FaWrench, FaThList, FaList } from "react-icons/fa"
import { useState } from "react"
export default function Navbar({ AccountName }) {
    let [navhidden, setnavhidden] = useState(true)
    let [sidehidden, setsidehidden] = useState(true)
    return <div className="bg-gray-700 flex items-center p-5 z-80 justify-between">
        <div className="float-left flex align-middle h-full flex-1">
            <a className="h-full w-20 grid mr-2" href="/login">
                <img src="https://picsum.photos/40/40" className="inline-block place-self-center" />
            </a>
            {!sidehidden && <div className="absolute md:hidden flex justify-start flex-col gap-y-3 p-2 w-6/12 h-3/4 bg-white translate-y-[3.75rem] translate-x-[-1.3rem] z-20">
                <button className="text-left ml-2 text-2xl bg-none text-black hover:text-gray-200 transition-colors">
                    <AiFillCalendar className="inline-block mr-1 mb-1" />
                    Dashboard
                </button>
                <button className="text-left ml-2 text-2xl bg-none text-black hover:text-gray-200 transition-colors">
                    <AiFillWallet className="inline-block mr-1 mb-1" />
                    All Products
                </button>
                <button className="text-left ml-2 text-lg bg-none text-black hover:text-gray-200 transition-colors">
                    <FaWrench className="inline-block mr-1 mb-1" />
                    Add/Edit Products
                </button>
                <button className="text-left ml-2 text-2xl bg-none text-black hover:text-gray-200 transition-colors">
                    <FaList className="inline-block mr-2 mb-1" />
                    Customer List
                </button>
            </div>}
        </div>
        <div className="h-full m-0 md:m-auto justify-self-start md:justify-self-center flex-5">
            <button className="w-9 sm:block md:hidden mr-3" onClick={() => { setsidehidden(!sidehidden) }}>
                <GoThreeBars className="w-full h-full m-auto text-white" />
            </button>
            <button className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Dashboard</button>
            <button className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">All Products</button>
            <button className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Add/Edit Products</button>
            <button className="hidden md:inline-block bg-none text-gray-300 hover:text-gray-200 transition-colors">Customer List</button>
        </div>
        {/* dashboard, all products, add/edit product, customer list */}
        {/* profile button with My account, settings, and logout */}
        {/* profile thing on right hidden on mobile and put on three dots instead */}
        <li className="hidden md:inline-block h-full ml-auto md:ml-0 list-none flex-1">
            <a className="text-white block w-max ml-auto mr-3 z-30 hover:cursor-pointer" onClick={() => { setnavhidden(!navhidden) }}>
                <img src="https://picsum.photos/40/40" className="inline-block place-self-center rounded-full mr-2" />
                <p className="inline-block mr-1">{AccountName || "LOSERMODE"}</p>
                <IoMdArrowDropdown className={`inline-block ${navhidden && "rotate-180"} transition-transform`} />
                <div className={`z-20 absolute bg-red-300 w-40 ${navhidden && "h-0 p-0" || "h-52 p-1"} transition-all rounded translate-y-5 overflow-hidden flex flex-col gap-y-3 items-center`}>
                    <p className="mb-1 mt-2 text-left w-full ml-7">RAVAGE</p>
                    <a href="/profile" className="w-full ml-7">
                        <BsPerson className="inline-block m-auto mr-1" />
                        My Account
                    </a>
                    <a href="/home" className="w-full ml-7">
                        <BsGearFill className="inline-block m-auto mr-1" />
                        Settings
                    </a>
                    <div className="h-px bg-blue-400 w-full"></div>
                    <a className="w-full ml-7" href="/DIE" >
                        <AiOutlineUnlock className="inline-block m-auto mr-1" />
                        Log Out
                    </a>
                </div>

            </a>
        </li>
    </div>
}