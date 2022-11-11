import Rating from "./Rating"
import {FiFlag} from 'react-icons/fi';

// updated version will only pass in user id from database and this info will be fetched here
function ProfileInfoCard({image, username, joinDate, location, rating, ratingCount, bought, sold}) {
    {/*Remove width later */}
  return (
    <div className="flex flex-col gap-4 w-full xl:w-1/3">
        <div className="flex gap-8 items-center justify-center">
            <img src={image} alt="Profile Image" className="rounded-full w-[40%] min-w-[8rem] object-cover aspect-square max-w-[6rem]"/>
            <div className="flex flex-col gap-2 text-neutral-900">
                <h3 className="font-semibold text-xl 2xl:text-2xl">{username}</h3>
                <p>Joined {joinDate}</p>
                <p>{location}</p>
                <div className="flex gap-2"><Rating rating={rating}/> <p>({ratingCount})</p></div>
                <div className="text-green-400 hover:text-green-600 text-2xl cursor-pointer w-max transition mt-2"><FiFlag/></div>
            </div>
        </div>
        <div className="flex justify-center gap-20 text-center w-[inherit] mx-auto">
            <div className="flex gap-2 flex-col">
                <p className="font-bold">{bought}</p>
                <p>Bought</p>
            </div>
            <div className="flex gap-2 flex-col">
                <p className="font-bold">{sold}</p>
                <p>Sold</p>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfoCard