import React from 'react';

function Message({ time, data, self }) {
  return (
    <div className={`w-max mb-4 ${self && 'self-end'} text-[#111]`}>
      <p className='text-right text-xs mb-1'>{time}</p>
      <div
        className={`${
          self ? 'bg-blue-400 text-[#eee]' : 'bg-slate-300 text-[#111]'
        } px-4 py-2 rounded font-medium`}>
        {data}
      </div>
    </div>
  );
}

export default Message;
