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
import AboutPage from "./Pages/AboutPage"
import TotalRevenue from './Components/TotalRevenue';
import SalesAnalytics from './Components/SalesAnalytics';

const App = (props) => {
  return (
    <div className='App'>
      <Router>
        <ul className='flex'>
          <li className='mr-6'>
            <Link to='/login'>Log In/Sign Up</Link>
          </li>
          <li className='mr-6'>
            <Link to='/home'>Home</Link>
          </li>
          <li className='mr-6'>
            <Link to='/about'>About</Link>
          </li>
          <li className='mr-6'>
            <Link to='/test'>test</Link>
          </li>
          <li className='mr-6'>
            <Link to='/test2'>test2</Link>
          </li>
        </ul>
        <Switch>
          <Route path='/' element={<TotalRevenue />} />
          <Route path='/home' element={<TotalRevenue />} />
          <Route path='/login' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />
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
        </Switch>
      </Router>
      {/* <div className='flex gap-8'>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
      </div> */}
    </div>
  );
};

export default App;
