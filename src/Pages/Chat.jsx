import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import socket from '../socket';
import { sendRequest } from '../Utils/requests';
function Chat() {
  const [message, setMessage] = useState('');
  const [usersInConversation, setUsersInConversation] = useState([]);

  const initialState = [];
  const messageReducer = (state, action) => {
    if (action.type === 'self' || action.type === 'other') {
      return [...state, { type: action.type, data: action.payload }];
    }
    if (action.type === 'custom') {
      return action.payload;
    }
    return new Error('No Matching Action Type');
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const sessionID = localStorage.getItem('sessionID');
    // if (sessionID) {
    //   socket.auth = { sessionID };
    //   socket.connect();
    // }
    // socket.request = JSON.parse(localStorage.getItem('user'))._id;

    /**
     * Get From Database
     */
    const id = JSON.parse(localStorage.getItem('user'))._id;
    const token = localStorage.getItem('token');

    sendRequest('chat/getMessages', 'POST', {
      body: {
        userToken: token,
        targetID: window.location.href.split('?id=')[1],
      },
      query: {},
    }).then((data) => {
      let messages = JSON.parse(data).list;
      messages = messages.map((m) => {
        return { type: m.sender === id ? 'self' : 'other', data: m.message };
      });
      dispatch({ type: 'custom', payload: messages.reverse() });
    });

    sendRequest('chat/getMessages', 'POST', {
      body: {
        userToken: token,
        targetID: null,
      },
      query: {},
    }).then((data) => {
      let messages = JSON.parse(data).list;
      let uniqueIDs = new Set();
      messages.forEach(m=>{
        const correctID = (m.sender === id ? m.receiver : m.sender);
        uniqueIDs.add(correctID);
        // if(!usersInConversation.includes(correctID)) setUsersInConversation((prev)=>[...prev, correctID]);
      });
      uniqueIDs.delete(id);
      sendRequest('user/users', 'POST', {
        body:{
          userIDs: Array.from(uniqueIDs)
        }
      }).then(userInfo=>{
        setUsersInConversation(JSON.parse(userInfo))
      });
    });

    // socket.requestID = { id };
    socket.connect();
    socket.onAny((event, ...args) => {
      // console.log(event, args);
    });
    socket.on('Chat-Message', (data) => {
      dispatch({ type: 'other', payload: data });
    });
    socket.on('users', (users) => {
      users.forEach((user) => {
        const id = socket['io'].opts.query.substring(3);
        user.self = user.userID === id;
        user.messages = [];
        setUsers((prevUsers) => [...prevUsers, user]);
      });
      socket.on('user connected', (user) => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].userID == user.userID) return;
        }
        setUsers((prevUsers) => [...prevUsers, user]);
      });
      socket.on('private message', ({ content, from }) => {
        console.log(content, from, '51');
        dispatch({ type: 'other', payload: content });
        // users.forEach((user) => {
        //   if (user.userID === from) {
        //   }
        // });
      });
      socket.on('session', ({ sessionID, userID }) => {
        // attach to auth for reconnection
        socket.auth = { sessionID };
        // store locally
        localStorage.setItem('sessionID', sessionID);
        // save the userID
        socket.userID = userID;
      });
    });
  }, []);

  const onMessage = (content) => {
    const toUserID = window.location.href.split('?id=')[1];
    // console.log('CLIENT USER ID -> ', toUserID);
    socket.emit('private message', {
      content,
      to: toUserID,
      token: localStorage.getItem('token'),
    });
    dispatch({
      type: 'self',
      payload: content,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit('sendmessage', message);
    // dispatch({ type: 'self', payload: message });
    onMessage(message);
    setMessage('');
  };

  return (
    <div className='flex h-[calc(100vh_-_56px)]'>
      <div className="bg-blue-200 flex flex-col gap-4 w-[30%] p-4">
        {usersInConversation.map(user=>{
          // CHANGE TO LINK TAGS - NEED TO FIX BUG
          return <a href={`http://localhost:3000/chat?id=${user._id}`} className='flex gap-4 items-center bg-slate-400 p-4 rounded cursor-pointer hover:bg-blue-800 hover:text-[#eee] transition'>
            <img src={`https://res.cloudinary.com/dztnsrrta/image/upload/${user.icon}`} alt="Icon" className='w-20 h-20 rounded-full object-cover'/>
            <p className='text-xl'>{user.username}</p>
          </a>
        })}
      </div>
      {/* grid grid-rows-[auto_auto_1fr_auto]  max-h-[calc(100vh_-_56px)]*/}
      <div className="m-6 border border-slate-200 grid grid-rows-[auto_auto_1fr_auto] max-h-[80%] w-[70%]">
        <div className="flex items-center gap-4 p-4">
          <img src="https://picsum.photos/40/40" alt="r" className='w-20 h-20 rounded-full object-cover'/>
          <div className="">
            <h3 className='font-semibold text-lg mb-2'>Felicia Riley</h3>
            <p>Active in the last day</p>
          </div>
        </div>
        <div className="h-px bg-slate-200 rounded w-[90%] mx-auto mb-4"></div>
        <div className="bg-blue-100 flex flex-col p-4 overflow-auto">
           {state.map(({ type, data }, idx) => {
          return (
            <Message key={idx} time={"3:30 PM"} data={data} self={type==="self"} first={idx===0}/>
          );
        })}
      </div>
        <div className="">
        <form
        className='send-message w-full flex justify-between items-center border-t border-slate-200'
        onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='rounded px-4 py-8 w-full focus:outline-none max-w-full'
          placeholder='Message...'
          autoComplete="off"
          name='Message Input'
        />
        <button
          type='submit'
          className='btn-primary w-max px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold mr-4'>
          Send
        </button>
      </form>
        </div>
        </div>

      </div>
      /* <form
        className='send-message p-4 w-1/4'
        onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border-2 border-neutral-900 rounded p-4 w-full'
          name='Message Input'
        />
        <button
          type='submit'
          className='btn-primary mt-8 w-full mb-5 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold flex items-center justify-center gap-4'>
          Send
        </button>
      </form>
      <div className='users'>
        {users.map((u, idx) => {
          return (
            <div key={idx}>
              <p>Hi! My userID is {u.userID}</p>
              <p>Is this myself? {u.self ? 'Yes' : 'No'}</p>
            </div>
          );
        })}
      </div>
      <div className='messages'>
        {/* {state.map(({ type, data }, idx) => {
          return (
            <div key={idx} className='bg-slate-400'>
              <p
                className={`${
                  type === 'self'
                    ? 'text-green-400'
                    : 'text-orange-400 text-right'
                } p-4 font-bold text-2xl`}>
                {data}
              </p>
            </div>
          );
        })}
      </div> 
    </div>*/
  );
}

export default Chat;
