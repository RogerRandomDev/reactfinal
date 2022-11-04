import { AiOutlinePlusCircle } from "react-icons/ai"
export default function SearchBar() {
    return (
        <div className="bg-white p-5 rounded-md m-5">
            <div className="flex justify-between">
                <form action="">
                    <input type="text" name="query" placeholder="Search..." className="mr-8 p-2 pl-3 pr-3 rounded border-2 text-gray-600 outline-none"></input>
                    <label htmlFor="filter" className="mr-3 text-gray-600">Sort By</label>
                    <select className="p-2 pl-3 pr-7 w-3/12 rounded border-2 text-gray-500 outline-none m-0" >
                        <option defaultValue>All</option>
                        <option value="1">Popular</option>
                        <option value="1">High Price</option>
                        <option value="1">Low Price</option>
                        <option value="1">High Rating</option>
                        <option value="1">Low Rating</option>
                    </select>
                </form>
                <a className="text-center align-bottom pl-4 pr-5 pt-2 pb-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors hover:cursor-pointer select-none">
                    <AiOutlinePlusCircle className="inline-block mr-2 mb-1" />
                    Add Item
                </a>
            </div>
        </div>
    )
}