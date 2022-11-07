import { GoThreeBars } from "react-icons/go"
import { IoMdArrowDropdown } from "react-icons/io"
export default function Navbar({ AccountName }) {
    return <div className="bg-gray-700 flex items-center p-5 z-20">
        <div className="float-left flex align-middle h-full">
            <span className="h-full w-20 grid mr-2">
                <img src="https://picsum.photos/40/40" className="inline-block place-self-center" />
            </span>
        </div>
        <div class="h-full m-none md:m-auto justify-self-start md:justify-self-center">
            <button className="w-9 sm:block md:hidden mr-3"><GoThreeBars className="w-full h-full m-auto text-white" /></button>
            <button className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Dashboard</button>
            <button className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">All Products</button>
            <button className="hidden md:inline-block mr-5 bg-none text-gray-300 hover:text-gray-200 transition-colors">Add/Edit Products</button>
            <button className="hidden md:inline-block bg-none text-gray-300 hover:text-gray-200 transition-colors">Customer List</button>
        </div>
        {/* dashboard, all products, add/edit product, customer list */}
        {/* profile button with My account, settings, and logout */}
        <li className="h-full ml-auto md:ml-0 list-none">
            <a className="float-right text-white">
                <img src="https://picsum.photos/40/40" className="inline-block place-self-center rounded-full mr-2" />
                <p className="inline-block mr-1">{AccountName}troller</p>
                <IoMdArrowDropdown className="inline-block" />
            </a>
            <div className="absolute translate-y-[3.75rem] bg-red-300 z-10">la cartera</div>
        </li>
    </div>
}