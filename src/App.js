import React, { useState } from 'react';
// back, propType
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import DataOverview from './Components/DataOverview';
import LandingPage from './Pages/LandingPage';
import AboutPage from './Pages/AboutPage';
import TotalRevenue from './Components/TotalRevenue';
import SalesAnalytics from './Components/SalesAnalytics';
import Table from './Components/Table';
import ProductDetail from './Pages/ProductDetail';
import TermsofService from './Pages/TermsofService';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import AddEditProduct from './Pages/AddEditProduct';
import Customers from './Pages/Customers';
import Profile from './Pages/Profile';
import Products from './Pages/Products';
import NavBar from './Components/Navbar';

import { Provider as FavoritesProvider } from './Context/favoritesContext';
import { Provider } from './Context/userContext';
import { useEffect } from 'react';
import Chat from './Pages/Chat';

const App = () => {
  // const [user, setUser] = useState('');

  // useEffect(() => {
  //   // let storedUser = localStorage.getItem('user');
  //   // if (storedUser) {
  //   //   setUser(JSON.parse(storedUser));
  //   //   console.log('34', user);
  //   // }
  // }, []);

  // const updateContext = (data) => {
  //   console.log(data);
  //   setUser(data);
  // };
  //doing this to ensure refreshing the page re-routes you correctly
  
  const navigate=useNavigate()
  useEffect(() => {
    const location = useLocation()
    console.log(location)
    navigate(location.pathname)
  },[])
  return (
    <FavoritesProvider>
      <Provider>
        <div className='App pt-14'>
          <Router>
            <NavBar />
            <Switch>
              <Route path='/' element={<Products />} />
              <Route path='/home' element={<TotalRevenue />} />
              <Route path='/login' element={<LandingPage />} />
              <Route path='/chat/:chatID' element={<Chat />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/about/terms' element={<TermsofService />} />
              <Route path='/about/privacy' element={<PrivacyPolicy />} />
              <Route
                path='/test'
                element={
                  <div className='flex gap-8'>
                    <DataOverview
                      fadedAccentColor='rgba(102, 88, 221, 0.25)'
                      accentColor='#6658dd'
                      Icon={FaRegHeart}
                      data='$58,947'
                      description='Total Revenue'
                    />
                    <DataOverview
                      fadedAccentColor='rgba(102, 88, 221, 0.25)'
                      accentColor='#6658dd'
                      Icon={FaRegHeart}
                      data='$58,947'
                      description='Total Revenue'
                    />
                    <DataOverview
                      fadedAccentColor='rgba(102, 88, 221, 0.25)'
                      accentColor='#6658dd'
                      Icon={FaRegHeart}
                      data='$58,947'
                      description='Total Revenue'
                    />
                    <DataOverview
                      fadedAccentColor='rgba(102, 88, 221, 0.25)'
                      accentColor='#6658dd'
                      Icon={FaRegHeart}
                      data='$58,947'
                      description='Total Revenue'
                    />
                  </div>
                }
              />
              <Route path='/test2' element={<SalesAnalytics />} />

              <Route
                path='/test3'
                element={
                  <Table
                    title='Recent Purchases'
                    type='Small'
                    th={['Profile', 'Date', 'Items', 'Amount']}
                    data={[
                      {
                        profile: 'Tomaslau',
                        date: new Date().toDateString(),
                        items: ['Nike Shoes', 'Adidas Pants'],
                        amount: '$134.99',
                      },
                      {
                        profile: 'Tomaslau',
                        date: new Date().toDateString(),
                        items: ['Nike Shoes', 'Adidas Pants'],
                        amount: '$134.99',
                      },
                      {
                        profile: 'Tomaslau',
                        date: new Date().toDateString(),
                        items: ['Nike Shoes', 'Adidas Pants'],
                        amount: '$134.99',
                      },
                      {
                        profile: 'Tomaslau',
                        date: new Date().toDateString(),
                        items: ['Nike Shoes', 'Adidas Pants'],
                        amount: '$134.99',
                      },
                      {
                        profile: 'Tomaslau',
                        date: new Date().toDateString(),
                        items: ['Nike Shoes', 'Adidas Pants'],
                        amount: '$134.99',
                      },
                    ]}
                  />
                }
              />
              <Route path='/productDetail' element={<ProductDetail />} />
              <Route path='/addEdit' element={<AddEditProduct />} />
              <Route path='/customers' element={<Customers />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/products' element={<Products />}></Route>
            </Switch>
          </Router>
          {/* <div className='flex gap-8'>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
      </div> */}
        </div>
      </Provider>
    </FavoritesProvider>
  );
};

export default App;
