import { useContext, useEffect, useState } from 'react';
import { userContext } from '../Context/userContext';

import ProductCard from "../Components/ProductCard";
import ProfileInfoCard from "../Components/ProfileInfoCard";
import PurchaseReceipt from "../Components/PurchaseReceipt";
import RecentPurchases from "../Components/RecentPurchases";
import ResponsiveGridDisplay from "../Components/ResponsiveGridDisplay";
import RowDisplay from "../Components/RowDisplay";
import { sendRequest } from '../Utils/requests';
import useGetUserProducts from '../hooks/useGetUserProducts';
import ProductCardSkeleton from '../Components/Skeletons/ProductCardSkeleton';
import { getLocal } from '../Utils/useLocalStorageAuth';
function Profile() {
  const { state } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const basePath = "https://res.cloudinary.com/dztnsrrta/image/upload/"

  // const userProducts = useGetUserProducts(state.user._id);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoading(true);
      let userID = window.location.search.substring(4);
      if (userID.length > 10 && userID != JSON.parse(localStorage.getItem("user"))._id) {
        sendRequest("user/show", "POST", {
          body: {
            "user": userID
          }
        }).then(res => {
          //  console.log(JSON.parse(res));
          setUserData(JSON.parse(res));
          //  console.log(userData);
        })
      } else {
        // console.log("40--",state);
        setUserData(state.user);
        // console.log("42-------",userData);
      }
      sendRequest('product/showUser', 'POST', {
        body: {
          userID: (userID.length < 10 ? JSON.parse(getLocal("user"))._id : userID),
        },
      }).then(products => {
        setUserProducts(JSON.parse(String(products)).products);
        setLoading(false);
      });
      sendRequest("product/favoritedProducts", 'POST', {
        body: {
          favorites: JSON.parse(getLocal("user")).favorites
        },
      });
      sendRequest('product/showUser', 'POST', {
        body: {
          userID: (userID.length < 10 ? state.user._id : userID),
        },
      }).then(products => {
        setUserProducts(JSON.parse(String(products)).products);
        setLoading(false);
      });
      sendRequest("product/favoritedProducts", 'POST', {
        body: {
          favorites: JSON.parse(getLocal("user")).favorites
        }
      }).then(favorites => {
        setUserFavorites(JSON.parse(favorites));
      })
    }

  }, []);

  return (
    (!loading && userData !== null) &&
    <div className="w-full flex flex-col gap-12 py-8 px-6 bg-[#404959] text-[#eee]">
      <div className="flex gap-12 items-center flex-col xl:flex-row">
        {/* <ProfileInfoCard image={"https://picsum.photos/400"} username={context.username} joinDate={context.joinDate} location={`${context.Location[0]}, ${context.Location[1]}`} rating={0} ratingCount={0} bought={0} sold={0}/> */}
        <ProfileInfoCard image={"https://res.cloudinary.com/dztnsrrta/image/upload/" + userData.icon} username={userData.username} joinDate={userData.joinDate} location={userData.Location[0]} rating={5} ratingCount={0} bought={0} sold={0} />
        {/* Favorited items must come from database, so props are just placeholders for now */}
        <div className="xl:border-l w-full ml-0 xl:mx-4">
          <RowDisplay title={"Favorited Items"}>
            {userFavorites.length > 0
              ?
              userFavorites.map((data, idx) => {
                return <ProductCard type={"favorite"} key={idx} image={basePath + data.images[0]} title={data.name} price={data.price} location={data.Location} id={data._id} link={`/productDetail?id=${data._id}`} />
              })
              :
              <p className="pl-3">No Favorited Items</p>
            }
          </RowDisplay>
        </div>
      </div>
      <div className="px-0 xl:px-20">
        <ResponsiveGridDisplay title={"Items From This Seller"}>
          {/* {new Array(25).fill().map((_,idx)=>{
            return <ProductCard key={idx} image={`https://picsum.photos/400?random=${idx+6}`} title={"Xbox Gaming Controller"} price={50} location={"Salt Lake City, UT"} link={"#"}/>
        })} */
            (!loading
              ?
              (userProducts.length > 0 ? (userProducts.map((data, idx) => {
                let search = window.location.search.substring(4);
                let userID = JSON.parse(localStorage.getItem("user"))._id;
                return <ProductCard type={search.length > 10 && search != userID ? "favorite" : "edit"} key={idx} image={basePath + data.images[0]} title={data.name} price={data.price} location={data.Location} id={data._id} link={`/productDetail?id=${data._id}`} />
              })) : <div>No Products!</div>)
              :
              <ProductCardSkeleton amount={5} />)
            // if(userProducts){

            // }
            // (userProducts &&

            // }))

          }
        </ResponsiveGridDisplay>
      </div>
      <RecentPurchases>
        {new Array(7).fill().map((_, idx) => {
          return <PurchaseReceipt key={idx} location={"Los Angeles, CA"} email="tb123@gmail.com" buyer="Trent Block" seller="Microsoft" logo="https://picsum.photos/400?random=0" date={new Date().toDateString()} items={[{ "name": "Gaming Laptop", "quantity": "1", "cost": "375", "description": "A cool laptop!" }]} />
        })}
      </RecentPurchases>
    </div>
  )
}

export default Profile