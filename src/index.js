import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/main.css';
import App from './App';
import axios from 'axios';
import 'jquery/dist/jquery.js';


setInterval(async () => {
  axios.get("https://zany-periodic-fisherman.glitch.me/test").then(data => {
  console.log(data)
})
.catch(e=>{
  console.log(e.response)
})
},60 * 1000)


//axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.baseURL = 'https://zany-periodic-fisherman.glitch.me/api';
    let userData =  JSON.parse(localStorage.getItem("userData"))
    let token
    if(userData){
        token= userData.token
    }
    
    //axios.defaults.headers.common['Authorization'] = {'Authorization': `Bearer ${token}`};
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.interceptors.request.use(request => {     
    //    console.log(request)
        
        // Edit request config
        return request;
    }, error => {
      //  console.log(error);
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        // Edit response config
        //console.log(response);
        return response;
    }, error => {
        console.log(error.response);
        return Promise.reject(error);
    });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
