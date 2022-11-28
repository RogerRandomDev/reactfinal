import React, {useState, useEffect, useReducer} from 'react'
//swap over to ws WebSocket. I got the format for it already finished on backend for us.
//shouldn't take much effort for us since they are similiar.
import { io } from "socket.io-client";
const socket = io('http://localhost:3001');
function Chat() {
    const [message, setMessage] = useState("");

    const initialState = [];
    const messageReducer = (state, action) => {
        if(action.type==="self" || action.type==="other"){
            return [...state, {type:action.type, data: action.payload}]
        }
        return new Error("No Matching Action Type");
    };

    const [state, dispatch] = useReducer(messageReducer, initialState);

    useEffect(()=>{
        socket.on("Chat-Message", data=>{
            dispatch({type:"other", payload:data})
          })
    },[]);
      const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("sendmessage", message);
        dispatch({type:"self", payload:message})
        setMessage("");
      };

  return (
    <div>
        <form className="send-message p-4 w-1/4" onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='border-2 border-neutral-900 rounded p-4 w-full' name="Message Input"/>
            <button type="submit" className='btn-primary mt-8 w-full mb-5 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold flex items-center justify-center gap-4'>Send</button>
        </form>
        <div className="messages">
            {state.map(({type, data},idx)=>{
               return <div key={idx} className='bg-slate-400'>
                <p className={`${type === "self" ? "text-green-400" : "text-orange-400 text-right"} p-4 font-bold text-2xl`}>{data}</p>
               </div>
            })}
        </div>
    </div>
  )
}

export default Chat