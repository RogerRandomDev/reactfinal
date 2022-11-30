import React from 'react';

function Message({ time, data, self }) {
  return (
    <div className={`w-max mb-4 ${self && 'self-end'} text-[#111]`}>
      <p
        className={`${
          self ? 'text-right' : 'text-left'
        } text-xs mb-1 text-slate-200`}>
        {time}
      </p>
      <div
        className={`${
          self ? 'bg-blue-400 text-[#eee]' : 'bg-slate-300 text-[#111]'
        } px-4 py-2 rounded font-medium break-words max-w-[325px] sm:max-w-[400px] md:max-w-[500px]`}>
        {data}
      </div>
    </div>
  );
}

export default Message;
