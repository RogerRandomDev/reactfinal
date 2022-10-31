import React from 'react';
import ApexRadialChart from './ApexRadialChart';
import LabeledComparison from './LabeledComparison';

function TotalRevenue() {
    
    
  return (
    <div className="bg-neutral-100 p-5 rounded w-[35rem]">
        <h3 className="font-semibold text-base text-neutral-900 mb-4">Total Revenue</h3>
        <div className="flex flex-col justify-center items-center text-center gap-4">
            <ApexRadialChart d1={68}/>
            <div className="flex flex-col gap-1 mb-3"><h4 className='text-slate-400 font-bold text-sm'>Total Sales Made Today</h4>
            <p className="text-neutral-900 text-3xl tracking-wider font-semibold">$178</p>
            <p className='text-slate-400 font-normal text-sm max-w-[75%] mx-auto mt-2 leading-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto fugit sunt velit.</p>
            </div>
            <div className="flex justify-between px-4 w-4/5">
                <LabeledComparison name="Target" increasing={false} value="7.8k"/>
                <LabeledComparison name="Last Week" increasing={true} value="1.4k"/>
                <LabeledComparison name="Last Month" increasing={false} value="15k"/>

            </div>
        </div>
    </div>
  )
}

export default TotalRevenue