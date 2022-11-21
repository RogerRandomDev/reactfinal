import { useReducer, useEffect, createContext } from 'react';
import { sendRequest } from '../Utils/requests';
import { storeLocal } from '../Utils/useLocalStorageAuth';

const favoritesContext = createContext('');

function Provider({ children }) {
  let initialState = [];
  const favoritesReducer = (state, action) => {
    if (action.type == 'HANDLE_FAVORITE') {
      // console.log({...action})
      if (!action.payload.favorited) {
        return [...state, action.payload.id];
      }
      return state.filter((i) => i !== action.payload.id);
    }
  };
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    return () => {
      let user = localStorage.getItem('user');
      if (user) {
        sendRequest('user/updateFavorites', 'PUT', {
          body: {
            userID: JSON.parse(user)._id,
            favorites: JSON.parse(user).favorites,
          },
        }).then((res) => {
          // ??
        });
      }
    };
  }, []);

  return (
    <favoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </favoritesContext.Provider>
  );
}

export { favoritesContext, Provider };
