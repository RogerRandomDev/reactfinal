import React from 'react';
import ChartJSDoughnut from './ChartJSDoughnut';

function TotalRevenue() {
    
    
  return (
    <div className="bg-neutral-100 p-5 rounded w-[35rem]">
        <h3 className="font-semibold text-base text-neutral-900">Total Revenue</h3>
        <div className="flex flex-col justify-center items-center text-center gap-4">
            <div className="w-1/4"><ChartJSDoughnut d1='68' d2='32'/></div>
            <div className="flex flex-col gap-1"><h4 className='text-slate-400 font-semibold text-sm'>Total Sales Made Today</h4>
            <p className="text-neutral-900 text-3xl tracking-wider font-semibold">$178</p>
            <p className='text-slate-400 font-normal text-sm max-w-[75%] mx-auto mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto fugit sunt velit voluptatem ratione beatae.</p>
            </div>
            <div className="flex justify-between"></div>
        </div>
    </div>
  )
}

export default TotalRevenue