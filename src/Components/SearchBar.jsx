import { AiOutlinePlusCircle } from "react-icons/ai"
import {Link} from "react-router-dom";
export default function SearchBar({search, setSearch}) {
    return (
        <div className="bg-[#eee] p-5 rounded-md my-5">
            <div className="sm:flex sm:justify-center">
                <form action="" className="flex flex-col gap-8 sm:flex-row sm:w-full max-w-3xl sm:justify-between">
                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} name="query" placeholder="Search..." className="p-3 rounded border-2 text-gray-600 outline-none"></input>
                    <div className="flex items-center">
                    <label htmlFor="filter" className="mr-3 text-gray-600">Sort By</label>
                    <select className="p-2 pl-3 pr-7 rounded border-2 text-gray-500 outline-none m-0" >
                        <option defaultValue>All</option>
                        <option value="Popular">Popular</option>
                        <option value="High Price">High Price</option>
                        <option value="Low Price">Low Price</option>
                        <option value="High Rating">High Rating</option>
                        <option value="Low Rating">Low Rating</option>
                    </select>
                    </div>
                <Link className="text-center align-bottom pl-4 pr-5 pt-2 pb-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors hover:cursor-pointer select-none flex justify-center items-center" to="/addEdit">
                    <AiOutlinePlusCircle className="mr-2"/>
                    <p className="">Add Item</p>
                </Link>
                </form>
            </div>
        </div>
    )
}