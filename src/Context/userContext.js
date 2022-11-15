import { useReducer, useEffect, createContext } from 'react';

const userContext = createContext('');

function Provider({ children }) {
  const initialState = { user: JSON.parse(localStorage.getItem('user')) || {} };
  const userReducer = (state, action) => {
    if (action.type == 'REFRESH_DATA') {
      return { ...state, user: action.payload };
    }
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    console.log('Running User Context Use Effect');
    dispatch({
      type: 'REFRESH_DATA',
      payload: JSON.parse(localStorage.getItem('user')),
    });
  }, []);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
  //   return <userContext.Provider value=''>{children}</userContext.Provider>;
}

export { userContext, Provider };
