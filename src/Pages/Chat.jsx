import React, { useState, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import Message from '../Components/Message';
import socket from '../socket';
import parseTime from '../Utils/parseTime';
import { sendRequest } from '../Utils/requests';
import { useNavigate } from 'react-router-dom';
function Chat() {
  const navigate=useNavigate();
  let { chatID } = useParams();
  const [message, setMessage] = useState('');
  const [usersInConversation, setUsersInConversation] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [hasTokenInUrl, setHasTokenInUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const initialState = [];
  const messageReducer = (state, action) => {
    if (action.type === 'self' || action.type === 'other') {
      return [
        {
          type: action.type,
          data: action.payload,
          time: parseTime(Date.now()),
        },
        ...state,
      ];
    }
    if (action.type === 'custom') {
      return action.payload;
    }
    return new Error('No Matching Action Type');
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    /**
     * Get From Database
     */
    setLoaded(false);
    const id = JSON.parse(localStorage.getItem('user'))._id;
    const token = localStorage.getItem('token');
    const tokenInUrl = chatID;
    setHasTokenInUrl(tokenInUrl);
    if (tokenInUrl) {
      sendRequest('chat/getMessages', 'POST', {
        body: {
          userToken: token,
          targetID: chatID,
        },
        query: {},
      }).then((data) => {
        let messages = JSON.parse(data).list;
        messages = messages.map((m) => {
          // need to remove all messages from database that dont have time
          return {
            type: m.sender === id ? 'self' : 'other',
            data: m.message,
            time: parseTime(m.time),
          };
        });
        dispatch({ type: 'custom', payload: messages });
      });
    }
    // users no matter what

    sendRequest('chat/getMessages', 'POST', {
      body: {
        userToken: token,
        targetID: null,
      },
      query: {},
    }).then((data) => {
      let messages = JSON.parse(data).list;
      if (messages.indexOf(id) != -1) {
        messages.splice(messages.indexOf(id), 1);
      }
      console.log(messages);
      sendRequest('user/users', 'POST', {
        body: {
          userIDs: messages,
        },
      }).then((userInfo) => {
        setUsersInConversation(JSON.parse(userInfo));
        setLoaded(true);
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
        console.log(content, from);
        if (from == tokenInUrl) {
          dispatch({ type: 'other', payload: content });
        }
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

  useEffect(() => {
    let cUser = usersInConversation.find((u) => {
      return u._id === chatID;
    });
    if (cUser) setCurrentUser(cUser);
  }, [usersInConversation]);

  const onMessage = (content) => {
    const toUserID = chatID;
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
    <div className='flex h-[calc(100vh_-_56px)] flex-col sm:flex-row bg-[#404959] text-[#eee]'>
      <div className='sm:border-r border-slate-200 border-opacity-50 flex flex-col gap-4 w-full sm:w-[30%] p-4 max-w-md mr-1'>
        <div className='flex sm:flex-col flex-wrap gap-4'>
          {usersInConversation.map((user, idx) => {
            return (
              <div
                key={idx}
                onclick={(e)=>{navigate(`/chat/${user._id}`)}}
                className='flex gap-4 items-center bg-[#6e799e] p-4 rounded cursor-pointer hover:bg-blue-800 group transition w-[45%] sm:w-auto'>
                <img
                  src={`https://res.cloudinary.com/dztnsrrta/image/upload/${user.icon}`}
                  alt='Icon'
                  className='w-20 h-20 rounded-full object-cover'
                />
                <p className='text-xl text-slate-200 group-hover:text-[#eee] transition'>
                  {user.username}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* grid grid-rows-[auto_auto_1fr_auto]  max-h-[calc(100vh_-_56px)]*/}
      {hasTokenInUrl ? (
        <div className='m-6 grid grid-rows-[auto_auto_1fr_auto] max-h-[80%] w-full sm:w-[70%] max-w-7xl mx-auto'>
          <Link
            to={`/profile?id=${currentUser._id}`}
            className='flex items-center gap-4 p-4 group w-max'>
            <img
              src={`https://res.cloudinary.com/dztnsrrta/image/upload/${currentUser.icon}`}
              alt='r'
              className='w-20 h-20 rounded-full object-cover'
            />
            <div className=''>
              <h3 className='font-semibold text-lg mb-2 group-hover:underline'>
                {currentUser.username}
              </h3>
              <p>Active in the last day</p>
            </div>
          </Link>
          <div className='h-px bg-slate-200 rounded w-[90%] mx-auto mb-4'></div>
          <div className='bg-[#6e799e] flex flex-col-reverse p-4 overflow-auto'>
            {state.map(({ type, data, time }, idx) => {
              return (
                <Message
                  key={idx}
                  time={time}
                  data={data}
                  self={type === 'self'}
                />
              );
            })}
          </div>
          <div className=''>
            <form
              className='send-message w-full flex justify-between items-center border border-opacity-50 border-slate-200 sm:rounded-br sm:rounded-bl border-t-0 bg-[#404959]'
              onSubmit={(e) => handleSubmit(e)}>
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='rounded px-4 py-8 w-full focus:outline-none max-w-full bg-[#404959]'
                placeholder='Message...'
                maxLength={190}
                autoComplete='off'
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
      ) : (
        <div className='grid place-items-center max-h-full w-full sm:w-[70%] max-w-7xl mx-auto'>
          {usersInConversation.length === 0 && loaded ? (
            <div>
              <h2 className='text-center text-6xl mb-4'>
                You Have No Open Chats
              </h2>
              <p className='text-center text-2xl'>
                Navigate to a Product to Chat with a User
              </p>
            </div>
          ) : (
            <h2 className='text-center text-6xl'>Select a Chat to Begin</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;
