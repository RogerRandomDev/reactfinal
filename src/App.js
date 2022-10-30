import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// import { FaRegHeart } from 'react-icons/fa';
// import DataOverview from './Components/DataOverview';
import LandingPage from './Pages/LandingPage';


const App = (props) => {
  return (
    <div className='App'>
      {/* <div className='flex gap-8'>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
        <DataOverview fadedAccentColor="rgba(102, 88, 221, 0.25)" accentColor="rgb(102, 88, 221)" Icon={FaRegHeart} data="$58,947" description="Total Revenue"/>
      </div> */}
      <LandingPage />
    </div>
  );
};

export default App;
