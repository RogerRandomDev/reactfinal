import React, { useState, useEffect, useReducer } from 'react';
import socket from '../socket';
import { sendRequest } from '../Utils/requests';
function Chat() {
  const [message, setMessage] = useState('');
  //   useEffect(()=>{
  //   let s = new WebSocket("wss://localhost:8080/");
  //   s.addEventListener('open',()=>{
  //     s.send("Hello World!");
  //   });
  // },[]);
  // webSocket.onmessage = (event) => {
  // };
  const initialState = [];
  const messageReducer = (state, action) => {
    if (action.type === 'self' || action.type === 'other') {
      return [...state, { type: action.type, data: action.payload }];
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
      console.log(data);
    });

    // socket.requestID = { id };
    socket.connect();
    socket.onAny((event, ...args) => {
      console.log(event, args);
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
    console.log('CLIENT USER ID -> ', toUserID);
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
    <div>
      <form
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
        {console.log(state)}
        {state.map(({ type, data }, idx) => {
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
    </div>
  );
}

export default Chat;
