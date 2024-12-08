import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("generating app")
let token = sessionStorage.getItem("User");
if(token){
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;       
}

root.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
);


