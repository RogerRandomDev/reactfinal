import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
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

import userContext from './Context/userContext';

const App = () => {
  const [user, setUser] = useState('');

  const updateContext = (data) => {
    console.log(data);
    setUser(data);
  };

  return (
    <div className='App'>
      <Router>
        <NavBar />
        {/* <ul className='flex gap-6'>
          <li>
            <Link to='/login'>Log In/Sign Up</Link>
          </li>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/test'>test</Link>
          </li>
          <li>
            <Link to='/test2'>test2</Link>
          </li>
          <li>
            <Link to='/test3'>Table</Link>
          </li>
          <li>
            <Link to='/productDetail'>Product Details</Link>
          </li>
          <li>
            <Link to='/addEdit'>Add / Edit</Link>
          </li>
          <li>
            <Link to='/customers'>Customers</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/products'>Products (Admin)</Link>
          </li>
        </ul> */}
        <Switch>
          <Route path='/' element={<TotalRevenue />} />
          <Route path='/home' element={<TotalRevenue />} />
          <Route path='/login' element={<LandingPage />} />
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
          <Route
            path='/productDetail'
            element={
              <ProductDetail
                alternateImages={[
                  'https://picsum.photos/500/800?random=1',
                  'https://picsum.photos/500/800?random=2',
                  'https://picsum.photos/500/800?random=3',
                  'https://picsum.photos/500/800?random=4',
                ]}
              />
            }
          />
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
    // </userContext.Provider>
  );
};

export default App;
